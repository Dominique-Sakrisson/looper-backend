const {Router} = require('express');
const url = require('url');
const path = require('path');
const UserService = require('../../services/UserService');

module.exports = Router()
//route to post a new user to the db
//takes in the request body sent from frontend, shapes it and passes it to user service
//userservice executes the user class Insert method and posts a user to our db
.post('/', async(req, res, next) => {
    try {
        const userShape = {
            ...req,
            email: req.body.email,
            password_digest: req.body.password
        }
        const user = await UserService.create(userShape);  
        res.sendFile(path.join(__dirname, '../../../../app/src', 'index.html'));
        res.send(user);
    } 
    catch (error) {
//THIS HERE WAS WORKING BEFORE IMPLIMENTING THE BCRYPT METHOD IN User.js        
       //search the error for mention of email
       const errorTypeEmail = error.detail.search('email' || 'already exists');
       //if error message has email, error probably is a duplicate email
       if(errorTypeEmail > -1){
         res.redirect(url.format({
             pathname: '/signUp',
             query: {
                 'error': 'duplicate_email'
             }
           
         }));
       }
        next(error);
    }
})
.get('/users', async (req,res, next) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error) {
        
    }
})

