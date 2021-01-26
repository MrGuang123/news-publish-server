import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'
import { UserDataInterface } from '@interfaces/UserInterface'
import dateFormat from '@utils/dateFormat'

class User extends Model implements UserDataInterface {
  // null断言 ! 在严格模式是必须的, 表示肯定有值
  public id!: number
  public userName: string
  public password: string
  public telephone: string
  public roleIds: string
  public token?: string
  public createdAt?: Date
  public updatedAt?: Date
}


// DataTypes.STRING => VARCHAR(255)
// DataTypes.STRING(11) => VARCHAR(11)
// 报错：PRIMARY must be unique 这个是数据库的ID一定要选中自动递增
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  roleIds: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('createdAt'))
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('updatedAt'))
    }
  },
}, {
  tableName: 'user',
  sequelize
})

// 如果表不存在则创建表，如果存在则不执行操作，异步操作需要添加catch捕获
User.sync().catch(e => console.log(e))

export default User
