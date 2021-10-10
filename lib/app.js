const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


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
app.use('/api/v1/forms', require('./controllers/forms/signUp'));
app.use('/api/v1/users', require('./controllers/users/users'));

app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/', (req,res) =>{
//     res.sendFile(path.join(__dirname, '../../public', 'index.html'))
// })
//handles any unknown request to the react app view
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist', 'index.html'))
// })
    
module.exports = app;
