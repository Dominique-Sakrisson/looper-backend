const {Router} = require('express');
const path = require('path');

module.exports = Router()
.get('/', async (req,res) => {
    console.log('/signUp GET route hit');
    // choose a path to send to, like home/:userId
    await res.redirect('/signUp');
})

.get('/signUp', function(req, res) {
    res.sendFile(path.join(__dirname, '../../../app/src', 'index.html'));
})
.get('/signIn', function(req, res) {
    res.sendFile(path.join(__dirname, '../../../app/src', 'index.html'));
});

