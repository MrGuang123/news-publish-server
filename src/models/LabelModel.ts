import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'
import { LabelDataInterface } from '@interfaces/LabelInterface'

class Label extends Model implements LabelDataInterface {
  public id: number
  public labelName: string
  public labelDes: string
  public createdUserId: number
  public isDelete!: boolean
  public createdAt?: Date
  public updatedAt?: Date
}

Label.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  labelName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  labelDes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'label',
  sequelize
})

Label.sync().catch(e => console.log(e))

export default Label
