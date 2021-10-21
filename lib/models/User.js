const pool = require('../utils/pool');

module.exports = class User {
    id;
    email;
    password_hash;
  

    constructor(row){
        this.id = row.id;
        this.email = row.email;
        this.password_hash = row.password_digest;
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
        try {
          const {rows} = await pool.query(`INSERT INTO users 
          (email, password_digest) 
          VALUES ($1, $2) RETURNING *`, 
          [user.email, user.password_hash]);
          return new User(rows[0]);  
        } catch (error) {
          console.log(error);
          return error;
        }
    }

    static async getById({email}){
      try {
        const {rows} = await pool.query(`SELECT id, email, password_digest FROM users WHERE email = $1 `, [email]); 
        return rows[0];
      } catch (error) {
        console.log(error, ': failed user lookup');
      }
    }
    

}

