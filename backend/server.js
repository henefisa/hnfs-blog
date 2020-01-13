require("dotenv/config");
const express = require("express");
const { urlencoded, json } = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const route = require("./routes/authentication.route");

const server = express();

server.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);
server.use(cookieParser());
server.use(urlencoded({ extended: true }));
server.use(json());

server.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});

server.use("/authentication/", route);
