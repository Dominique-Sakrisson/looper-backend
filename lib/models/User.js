const pool = require('../utils/pool');

module.exports = class User {
    id;
    email;
    password;
  

    constructor(row){
        this.id = row.id;
        this.email = row.email;
        this.password = row.password;
    }

    static async insert(user){
        console.log(user, 'did this logggg');
        const{
            rows
        } = await pool.query(`INSERT INTO users 
        (email, password_digest) 
        VALUES ($1, $2) 
        RETURNING *`, 
        [user.email, user.password_digest ]);
        return new User(rows[0]);
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

}

