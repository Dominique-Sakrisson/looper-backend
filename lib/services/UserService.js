const User = require('../models/User');

module.exports = class UserService {
  static async create(user, res){
    return await User.insert(user, res);
  }

  static async getUsers(){
    return await User.getUsers(); 
  }

  static async getById(id){
    return await User.getById(id);
  }

//   static async updateUser(id, quantity){
//     return await User.updateUser(id, quantity);
//   }

//   static async deleteUser(id){
//     return await User.deleteUser(id);
//   }
};
