const express = require('express');
const cors = require('cors');
const client = require('../server.js');
const app = express();
const path = require('path');


app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../../app/src')));

app.post('/api', (req,res) => {
    console.log('connected to react');
    // choose a path to send to, like home/:userId
    res.redirect('/signUp');
    // res.send('sup');
    
});
// sendFile will go here
app.get('/signUp', function(req, res) {
    res.sendFile(path.join(__dirname, '../../app/src', 'index.html'));
  });
module.exports = app;
