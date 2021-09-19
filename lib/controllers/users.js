const {Router} = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
.post('/api/users', async(req, res, next) => {
    try {
        console.log('we innnn it');
        console.log(req.body, 'requestt body should have a thing');
        const userShape = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        }
        try {
            const user = await UserService.create(userShape);
            res.send(user);
        } catch (error) {
                console.log(error);
        }
    } catch (error) {
        next(error);
    }
})
.get('/api/userForm', (req,res) => {
        console.log('connected to react');
        console.log(req.body);
        res.redirect('/signUp');
        // choose a path to send to, like home/:userId
        // res.send('sup');
    });
    


