const express = require('express');
const route = express.Router();

const db = require('../db');

route.get('/posts', (req, res) => {
    res.json(db.get('posts'));
});

route.post('/contact', (req, res) => {
    res.sendStatus(200);
});

route.post('/posts', (req, res) => {
    let posts = db.get('posts');
    posts.push({id: posts.value().length + 1, postDate: new Date().toLocaleDateString(), ...req.body}).write();
});
module.exports = route;