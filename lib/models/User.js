const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
const url = require('url');
const path = require('path');
module.exports = class User {
    id;
    email;
    password;
  

    constructor(row){
        this.id = row.id;
        this.email = row.email;
        this.password = row.password_digest;
    }

    static async getUsers(){
      try {
          const { rows } = await pool.query(
            'SELECT * FROM users');
          return rows.map(user =>  new User(user));
        } catch(error) {
          error;
        }   
    }


    static async insert(user, res){
      bcrypt.hash(user.password_digest, 10, async (err, hash) => {   
        try {
          const {rows} = await pool.query(`INSERT INTO users 
          (email, password_digest) 
          VALUES ($1, $2) 
          RETURNING *`, 
          [user.email, hash]);
          return new User(rows[0]);  
        } catch (error) {

//NEED TO FIGURE OUT HOW TO REDIRECT IN THIS CASE BACK TO SIGN UP WITH QUERY PARAMETERS SET LIKE BEFORE
          // console.log(error + 'yeeeeeeeee'); 
          console.log(error, 'waddup');
          const errorTypeEmail = error.detail.search('email' || 'already exists');
          console.log(errorTypeEmail);
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
      })
    }
    

}

