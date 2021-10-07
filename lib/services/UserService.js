const User = require('../models/User');

module.exports = class UserService {
  static async create(user){
    return await User.insert(user);
  }

  static async getUsers(){
    return await User.getUsers(); 
  }

  static async getById(user){
    return await User.getById(user);
  }

//   static async updateUser(id, quantity){
//     return await User.updateUser(id, quantity);
//   }

//   static async deleteUser(id){
//     return await User.deleteUser(id);
//   }
};
