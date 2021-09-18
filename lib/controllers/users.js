const {Router} = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
.post('/', async(req, res, next) => {
    try {
        console.log('we innnn it');
        console.log(req.body, 'requestt body should have a thing');
        const user = await UserService.create(req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
})
