const { Router } = require("express");
const { compare, hash } = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const uuid = require("uuid");

const db = require("../db");
const { isAuth } = require("../isAuth");

const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
} = require("../tokens");
const route = Router();

route.get("/posts", (req, res) => {
    res.json(db.get("posts"));
});

route.post("/contact", (req, res) => {
    res.sendStatus(200);
});

route.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = db
            .get("users")
            .find(user => user.username === username)
            .value();
        if (!user) throw new Error("Wrong username or password");
        const valid = await compare(password, user.password);
        if (!valid) throw new Error("Wrong username or password");
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);

        db.get("users")
            .chain()
            .find({ id: user.id })
            .assign({ refreshToken })
            .write();
        sendRefreshToken(res, refreshToken);
        sendAccessToken(req, res, accessToken);
    } catch (error) {
        res.json(`${error.message}`);
    }
});

route.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({
        message: "Logged out"
    });
});

route.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password);
    let users = db.get("users");
    try {
        const validUsername = users
            .find(user => user.username === username)
            .value();
        if (validUsername && validUsername.username)
            throw new Error("Username is already exist");
        const validEmail = users.find(user => user.email === email).value();
        if (validEmail && validEmail.email)
            throw new Error("Email is already exist");

        const id = uuid();
        const hashPassword = await hash(password, 10);
        users
            .push({
                id,
                username,
                password: hashPassword,
                email
            })
            .write();
        res.json({
            ok: true
        });
    } catch (error) {
        res.json({ errorMessage: `${error.message}` });
    }
});

route.post("/posts", (req, res) => {
    let posts = db.get("posts");
    posts
        .push({
            id: posts.value().length + 1,
            postDate: new Date().toLocaleDateString(),
            ...req.body
        })
        .write();
    res.json({
        ok: true
    });
});

route.put("/change_password", async (req, res) => {
    try {
        const userId = isAuth(req);
        const user = db
            .get("users")
            .find(user => user.id === userId.userId)
            .value();
        if (userId !== null) {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const validOldPassword = await compare(oldPassword, user.password);
            if (!validOldPassword) throw new Error("Wrong old password");
            if (newPassword !== confirmNewPassword)
                throw new Error("Confirm password must match new password");
            const hashedNewPassword = await hash(newPassword, 10);
            db.get("users")
                .chain()
                .find(user)
                .assign({ password: hashedNewPassword })
                .write();
            res.json({
                ok: true
            });
        }
    } catch (error) {
        res.json({
            errorMessage: `${error.message}`
        });
    }
});

route.post("/refresh_token", (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.send({ accessToken: "" });
    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.send({ accessToken: "" });
    }

    const user = db
        .get("users")
        .find(user => user.id === payload.userId)
        .value();
    if (!user) return res.send({ accessToken: "" });
    if (user.refreshToken !== token) {
        return res.send({ accessToken: "" });
    }
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    db.get("users")
        .chain()
        .find({ id: user.id })
        .assign({ refreshToken })
        .write();
    sendRefreshToken(res, refreshToken);
    return res.send({ accessToken, username: user.username });
});

module.exports = route;
