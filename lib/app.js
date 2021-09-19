const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../../app/src')));
app.use('api/users', require('./controllers/users'))
app.use('/', require('./controllers/users'));

// sendFile will go here
app.get('/signUp', function(req, res) {
    // res.sendFile(path.join(__dirname, '../../app/src', 'index.html'));
  });
  app.post('/api/postUser', function(req, res) {
    console.log(req.body, ' this is the req');
    res.redirect('/tracks')
      // res.sendFile(path.join(__dirname, '../../app/src', 'index.html'));
    });
    
    module.exports = app;
