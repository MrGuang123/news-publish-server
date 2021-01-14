import UserModel from '../models/UserModel'

class UserDao {
  getUserList() {
    return UserModel.findAll({
      attributes: {
        exclude: ['password']
      }
    })
  }
}

export default UserDao
