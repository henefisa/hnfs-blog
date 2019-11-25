const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const route = require('./api/api');

const PORT = 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});

app.use('/api/', route);