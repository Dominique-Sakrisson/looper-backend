const pool = require('../utils/pool');

module.exports = class User {
    id;
    email;
    first_name;
    last_name;
    password_digest;
    tel;

    constructor(row){
        this.id = row.id;
        this.email = row.email;
        this.first_name = row.first_name;
        this.last_name = row.last_name;
        this.password_digest = row.password_digest;
        this.tell = row.tel;
    }

    static async insert(user){
        const{
            rows
        } = await pool.query(`INSERT INTO users 
        (email, first_name, last_name, password_digest, tel) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`, 
        [user.email, user.first_name, user.last_name, user.password_digest, user.tel]);
        return new User(rows[0]);
    }

}

