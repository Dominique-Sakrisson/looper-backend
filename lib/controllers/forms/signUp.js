const {Router} = require('express');
const path = require('path');

module.exports = Router()
.get('/', async (req,res) => {
    console.log('connected to react');
    console.log(req.body);
    // choose a path to send to, like home/:userId
    await res.redirect('/signUp');
})
.get('/signUp', function(req, res) {
    console.log('heoylsukdf');
    res.sendFile(path.join(__dirname, '../../../app/src', 'index.html'));
});

