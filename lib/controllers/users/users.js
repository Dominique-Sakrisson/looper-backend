const {Router} = require('express');
const url = require('url');
const UserService = require('../../services/UserService');

module.exports = Router()
.post('/', async(req, res, next) => {
    try {
        console.log('we innnn it');
        console.log(req.body, 'requestt body should have a thing');
        const userShape = {
            email: req.body.email,
            password_digest: req.body.password
        }
        try {
            const user = await UserService.create(userShape);
            res.send(user);
            res.sendFile(path.join(__dirname, '../../../app/src', 'index.html'));
        } catch (error) {
            
                console.log(error);

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
        }
    } catch (error) {
        next(error);
    }
})
.get('/api/users', async (req,res, next) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
})

.get('/', (req,res) => {
        console.log('hit the root');
        // choose a path to send to, like home/:userId
        res.redirect('/signUp');
        
        res.send('helooo');
})
