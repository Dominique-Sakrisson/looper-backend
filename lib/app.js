const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use('/api/v1/forms', require('./controllers/forms/signUp'))
app.use('/api/v1/users', require('./controllers/users/users'))

app.use((req, res, next) => {
  // For example, a GET request to `/test` will print "GET /test"
  console.log(`request method: ${req.method} request url: ${req.url}`);
  // res.send('hello');
  next();
});
  
  app.post('/api/v1/postUser', function(req, res) {
    console.log(req.body, ' this is the req');
    res.redirect('/tracks')
    // res.sendFile(path.join(__dirname, '../../app/src', 'index.html'));
  });
  
  app.use(express.static(path.join(__dirname, '../../app/src')));
    module.exports = app;
