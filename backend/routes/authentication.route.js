const { Router } = require("express");
const { compare, hash } = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const uuid = require("uuid");

const db = require("../db");
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

route.post("/check_username", (req, res) => {
    const { username } = req.body;
    try {
        const validUsername = db
            .get("users")
            .find(user => user.username === username)
            .value();
        if (!validUsername) throw new Error("Username is already exist");
        res.sendStatus(200);
    } catch (error) {
        res.json(`${error.message}`)
    }
});

route.post("/check_email", (req, res) => {
    const { email } = req.body;
    try {
        const validEmail = db
            .get("users")
            .find(user => user.email === email)
            .value();
        if (!validEmail) throw new Error("Email is already exist");
        res.json({
            ok: true
        });
    } catch (error) {
        res.json(`${error.message}`)
    }
});

route.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const validUsername = db
            .get("users")
            .find(user => user.username === username)
            .value();
        if (!validUsername) throw new Error("Username is already exist");
        const validEmail = db
            .get("users")
            .find(user => user.email === email)
            .value();
        if (!validEmail) throw new Error("Email is already exist");

        const id = uuid();
        const hashPassword = hash(password, 10);

        db.get("users").push({
            id,
            username,
            hashPassword,
            email
        });
        res.json({
            success: true
        });
    } catch (error) {
        res.json(`${error.message}`);
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
    return res.send({ accessToken });
});

module.exports = route;
