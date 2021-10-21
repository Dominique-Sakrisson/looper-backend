const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/UserService');
const {checkAndAddToken} = require('../../auth/checkToken');
const { sendVerifySignUp } = require('../../services/EmailService');



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
    //check that both email and password exist in request body
    if(!req.body.email || !req.body.password){
        res.status(400).json({ error: 'email and password required' });
        return;
    }
    //search db for that user
    const foundUser = await UserService.getById(req.body);

    //if we have a user in db with same email
    //respond with the error which the frontend will then reRoute
    if(foundUser){
        res.status(303);
        return res.send(query ={
            'error': 'duplicate_email'
        })
    }

    //user is a new user
    try {
        //shape the user
        const userShape = {
            email: req.body.email, 
            password_hash: await hashPassword(req.body.password)
        };
        //post a new user
        const user = await UserService.create(userShape);
        await sendVerifySignUp(user)
        res.send(JSON.stringify(user));
    }
    catch (error) { 
        console.log(error, ': is error response');
        return error;
    }
})

.post('/login', async(req ,res, next) => {
    const userShape = {
        email: req.body.email, 
        password: req.body.password
    };
    const user = await UserService.getById(userShape);
    //returns true or false depending on email & password match
    const validatedUser = await UserService.validateUser(user, userShape);
    
    if(validatedUser) {
        
        jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '1h'}, (err, token) => {
            if(err){
                res.send({err: 'Incorrect email or password'});
            }
            console.log(token);
            user.token = token;
            res.send(user);    
        });
    }
    if(!validatedUser) res.send({error: 'Incorrect email or password'})
})

//verify theres a token from here and add it to the request
.use(checkAndAddToken)
.get('/profile/:token', async(req, res) => {
    console.log(req);
    // const userByToken = await UserService.getByToken(req.token); 

    jwt.verify(req.token, process.env.SECRET_KEY, (err, authorizedData) => {
        if(err){
            console.log('ERROR: could not connect to the protected route');
            res.status(403);
        } else {
            res.json({
                message: 'successful log in',
                authorizedData
            });

            console.log('SUCCESS: Connected to proteced route');
        }
    })
})

.put('/profile/:id', async ( req, res) =>{

})
