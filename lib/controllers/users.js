const {Router} = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
.post('/api/users', async(req, res, next) => {
    try {
        console.log('we innnn it');
        console.log(req.body, 'requestt body should have a thing');
        const user = await UserService.create(req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
})
.post('/api', (req,res) => {
    console.log('connected to react');
    console.log(req.body);
      res.redirect('/signUp');
    
    // choose a path to send to, like home/:userId
    // res.send('sup');
    
});
