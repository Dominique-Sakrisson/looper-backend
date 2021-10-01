const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/api/v1/forms', require('./controllers/forms/signUp'));
app.use('/api/v1/users', require('./controllers/users/users'));
app.use(express.static(path.join(__dirname, '../../app/src')));
    
module.exports = app;
