const express = require('express');
const route = express.Router();

const db = require('../db');

route.get('/posts', (req, res) => {
    console.log(1);
});
route.get('/', (req, res) => {
    let arr = ['1','2'];
    res.json(arr);
    console.log(1);
})
route.post('/posts', (req, res) => {
    let posts = db.get('posts');
    posts.push({id: posts.value().length + 1, ...req.body}).write();
    res.redirect('/posts');
});
module.exports = route;