const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserService {
  static async create(user){
    return await User.insert(user);
  }

  static async getUsers(){
    return await User.getUsers(); 
  }

  static async getById(user){
    try {
      const userRes = await User.getById(user);
      return userRes;
    } catch (error) {
      console.log('user lookup failed: ', error);
      return error;
    }
  }

  static async validateUser(dbUser, clientUser){
    if(dbUser){
      const validPassword = await bcrypt.compare(clientUser.password, dbUser.password_digest);
      if(!validPassword){
        console.log("Invalid email or password");
        return false;
       } else{
         console.log(dbUser, 'sent');
         return dbUser;
       }

    }
  }
  



//   static async updateUser(id, quantity){
//     return await User.updateUser(id, quantity);
//   }

//   static async deleteUser(id){
//     return await User.deleteUser(id);
//   }
};
