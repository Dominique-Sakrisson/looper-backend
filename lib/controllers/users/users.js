const {Router} = require('express');
const url = require('url');
const path = require('path');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/UserService');

module.exports = Router()
//route to post a new user to the db
//takes in the request body sent from frontend, shapes it and passes it to user service
//userservice executes the user class Insert method and posts a user to our db
.post('/', async(req, res, next) => {
    const userShape = {email: req.body.email, password_digest: req.body.password
    }
    try {
        //post a new user
        const user = await UserService.create(userShape, res);
        //redirect to signIn Form
        await res.redirect('/signIn');

    } 
    catch (error) {
       console.log('error response: ', error);
    }
})

.post('/signIn', async (req ,res, next) => {
    const userShape = {email: req.body.email, password_digest: req.body.password};
    try {
        const user = await UserService.getById(userShape, res);
        await user.json();
        console.log(user);
        
    } catch (error) {
        console.log('error response: ', error);
    }
})

.get('/', async (req,res, next) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error) {
        
    }
})

