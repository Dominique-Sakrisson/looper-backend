const {Router} = require('express');
const bcrypt = require('bcrypt');

const url = require('url');
const path = require('path');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/UserService');
const User = require('../../models/User');

module.exports = Router()
//route to post a new user to the db
//takes in the request body sent from frontend, shapes it and passes it to user service
//userservice executes the user class Insert method and posts a user to our db
.post('/signUp', async(req, res, next) => {
    //check that both email and password exist
    if(!req.body.email || !req.body.password){
        res.status(400).json({ error: 'email and password required' });
        return;
    }
    //shape the user
    const userShape = {
        email: req.body.email, 
        password_digest: bcrypt.hashSync(req.body.password, 8)
    };
    //search db for that user first
    const foundUser = await UserService.getById(userShape.email);
    
    console.log(foundUser);
    if(foundUser){
        res.status(303);
        return res.send(query ={
            'error': 'duplicate_email'
        })
        
    }
   
    try {
        //post a new user
        const user = await UserService.create(userShape, res);
        res.send(JSON.stringify(user));
    } 
    catch (error) { 
        //if error message has email, error probably is a duplicate email
        // if(errorTypeEmail > -1){
        //   res.redirect(url.format({
        //       pathname: '/api/v1/signUp',
        //       query: {
        //           'error': 'duplicate_email'
        //       }
        //   }));
        // }
        console.log(error, ': is error response');
        return error;
    }
  
})

.post('/signIn', async (req ,res, next) => {
    const userShape = {email: req.body.email, password_digest: req.body.password};
    try {
        const user = await UserService.getById(userShape, res);
        await user.json();
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

