const {Router} = require('express');
const bcrypt = require('bcrypt');

const url = require('url');
const path = require('path');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/UserService');
const User = require('../../models/User');


const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
       return error;
    }
}
module.exports = Router()
.get('/', async (req,res, next) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error) {
        
    }
})


//takes in the request body sent from frontend, shapes it and passes it to user service
//userservice executes the user class Insert method and posts a user to our db
.post('/signUp', async(req, res, next) => {
    //check that both email and password exist
    if(!req.body.email || !req.body.password){
        res.status(400).json({ error: 'email and password required' });
        return;
    }
    //search db for that user first
    const foundUser = await UserService.getById(req.body);
    //if we have a user in db with same email
    //respond with the error which the frontend will then reRoute
    if(foundUser){
        res.status(303);
        return res.send(query ={
            'error': 'duplicate_email'
        })
    }

    try {
        //shape the user
        const userShape = {
            email: req.body.email, 
            password_hash: await hashPassword(req.body.password)
        };
        //post a new user
        const user = await UserService.create(userShape);
        res.send(JSON.stringify(user));
    }
    catch (error) { 
        console.log(error, ': is error response');
        return error;
    }
})

.post('/login', async (req ,res, next) => {
    const userShape = {
        email: req.body.email, 
        password: req.body.password
    };
    const user = await UserService.getById(userShape);
    const validatedUser = await UserService.validateUser(user, userShape);
    if(validatedUser) res.send(user)
    if(!validatedUser) res.send({error: 'Incorrect email or password'})
})


