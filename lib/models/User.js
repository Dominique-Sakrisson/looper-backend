const pool = require('../utils/pool');
const bcrypt = require('bcrypt');
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


    static async insert(user){
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
          console.log(error + 'yeeeeeeeee'); 
        }
      })
    }
    

}

