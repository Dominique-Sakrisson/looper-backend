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

    if(!req.body.email || !req.body.password){
        res.status(400).json({ error: 'email and password required' });
      return;
    }
    const userShape = {
        email: req.body.email, 
        password_digest: bcrypt.hashSync(req.body.password, 8)
    };
    
    const foundUser = UserService.getById(userShape.email);

    if(foundUser){
        res.status(303);
        res.redirect(url.format({
            pathname: '/api/v1/forms/signUp',
            query: {
                'error': 'duplicate_email'
            }
        }));
    }
   
    try {
        //post a new user
        const user = await UserService.create(userShape, res);
        // const user = await User.insert(userShape, res);
        
        // await res.send(JSON.stringify(user));
        
    } 
    catch (error) {
        //NEED TO FIGURE OUT HOW TO REDIRECT IN THIS CASE BACK TO SIGN UP WITH QUERY PARAMETERS SET LIKE BEFORE
        const errorTypeEmail = error.detail.search('email' || 'already exists');
        console.log(errorTypeEmail);
        //if error message has email, error probably is a duplicate email
        if(errorTypeEmail > -1){
          res.redirect(url.format({
              pathname: '/api/v1/signUp',
              query: {
                  'error': 'duplicate_email'
              }
          }));
        }
        console.log(error, ': is error response');
    }
    // await res.json(user);
    // console.log(user, 'user');
    // try {
    //     // redirect to signIn Form
    //     res.redirect('/api/v1/users/signIn');
    // } catch (error) {
    //     res.send(error)
    // }
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

