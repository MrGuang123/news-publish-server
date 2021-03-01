import { UserInterface, UserListQueryInterface, UserInfoQueryInterface, UserCreateParams } from "@interfaces/UserInterface"
import UserDao from '@dao/UserDao'
import dateFormat from '@utils/dateFormat'
class UserService implements UserInterface {
  public userDao: UserDao
  constructor() {
    this.userDao = new UserDao()
  }

  // 获取全部用户列表
  getUserList(params: UserListQueryInterface) {
    params.pageSize = Number(params.pageSize)
    params.pageIndex = Number(params.pageIndex)
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }

  // 获取一个用户信息
  async getUserInfo(params: UserInfoQueryInterface) {
    const { id } = params

    try {
      const result = await this.userDao.getUserInfo(Number(id))
      return result
    } catch (err) {
      return undefined
    }
  }

  // 创建用户
  async createUser(params: UserCreateParams) {
    const mustParam = ['userName', 'password', 'telephone', 'roleIds']
    const paramEnough = mustParam.every(key => params[key] !== 'undefined')

    if (!paramEnough) {
      return 'ErrorInfo:400:创建用户参数不足'
    }

    try {
      const userInfo = await this.userDao.createUser(params)
      const result = await this.userDao.getUserInfo(userInfo.id)
      return result
    }catch (e) {
      return 'ErrorInfo:400:创建用户失败'
    }
  }

  // 更新用户信息
  async updateUser(params: UserCreateParams) {
    const mustParam = ['userName', 'password', 'telephone', 'roleIds']
    const paramEnough = mustParam.every(key => params[key] !== 'undefined')

    if (!paramEnough) {
      return 'ErrorInfo:400:更新用户参数不足'
    }

    params.id = Number(params.id)

    try {
      const userInfo = await this.userDao.getUserInfo(params.id)

      if(userInfo) {
        await this.userDao.updateUser(params)
        return '修改用户成功'
      }else {
        return '用户不存在'
      }
    }catch (e) {
      return '修改用户失败'
    }

  }

  // 删除用户
  async deleteUser(params: UserInfoQueryInterface) {
    const { id } = params

    try {
      const userInfo = await this.userDao.getUserInfo(Number(id))
      let userJson
      if(userInfo) {
        userJson = userInfo.toJSON()
        await this.userDao.deleteUser(userJson)
        return '删除成功'
      }else {
        return '用户不存在'
      }
    }catch (e) {
      return '删除失败'
    }
  }
}

export default UserService
