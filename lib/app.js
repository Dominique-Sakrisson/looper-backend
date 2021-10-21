const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const passport = require('passport');
require('./services/PassportService');
const cookieSession = require('cookie-session')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));



app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "*"
      // "http://<YOUR-APP-NAME>.herokuapp.com"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
  }))
  app.use(passport.initialize());
  app.use(passport.session());
app.use('/api/v1/forms', require('./controllers/forms/signUp'));
app.use('/api/v1/users', require('./controllers/users/users'));
app.use('/api/v1/tracks', require('./controllers/tracks'));
app.use(express.static(path.join(__dirname, 'dist')));
// app.get("/", (req, res) => {
//   res.json({message: "You are not logged in"})
// })
app.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req, res) {
    res.redirect('/');
  }
);
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`))
// app.get('/', (req,res) =>{
//     res.sendFile(path.join(__dirname, '../../public', 'index.html'))
// })
//handles any unknown request to the react app view
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist', 'index.html'))
// })
    
module.exports = app;
