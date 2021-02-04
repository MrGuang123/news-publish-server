import { Op } from 'sequelize'
import LabelModel from '@models/LabelModel'
import UserModel from '@models/UserModel'
import { LabelDataInterface, LabelListQueryInterface, CommonCreateInterface } from '@interfaces/LabelInterface'

// 将label和user创建关联，user对于label是一对多
// foreignKey是label表的创建者id，对应targetKey是用户表的用户id，
// 还可以添加as属性创建UserModel的别名，如果model名称过长可以使用
// 重要！！！关联只能定义一次，如果在方法里定义，每次查询都会创建关联，创建别名，第一次请求正常，第二次请求就会报错别名
// 报错信息：You have used the alias user in two separate associations. Aliased associations must have unique aliases
// 大体意思为在两个不同的关联中都使用了同一个别名，别名必须具有唯一性
LabelModel.belongsTo(UserModel, {
  foreignKey: 'createdUserId',
  targetKey: 'id',
  as: 'user'
})
class UserDao {
  // 获取标签列表
  getLabelList(params: LabelListQueryInterface) {
    let searchOption = {
      isDelete: 0
    }
    // 如果传递labelName参数，则进行模糊查询
    if(params.labelName) {
      searchOption = Object.assign(searchOption, {
        labelName: {
          [Op.like]: `%${params.labelName}%`
        }
      })
    }

    return LabelModel.findAll({
      raw: true,
      where: searchOption,
      // include关键字表示关联查询
      include: [{
        model: UserModel,
        // 创建关联时定义了别名  这里也要保持一致
        as: 'user',
        // 这里会获取UserModel的userName属性，并且给userName创建了别名为creatorName，
        // 如果需要获取其他属性，可以在第一维数组中继续添加
        attributes: [['userName', 'creatorName']]
      }],
      attributes: {
        exclude: ['isDelete']
      },
      limit: params.pageSize,
      offset: params.pageSize * (params.pageIndex - 1)
    })
  }

  // 获取标签信息
  getLabelInfo(labelId: number): Promise<LabelDataInterface> {
    return LabelModel.findOne({
      where: {
        isDelete: 0,
        id: labelId
      },
      attributes: {
        exclude: ['isDelete']
      }
    })
  }

  // 创建标签
  createLabel(params: CommonCreateInterface) {
    return LabelModel.create(params)
  }

  // 修改标签信息
  updateLabel(params: CommonCreateInterface) {
    return LabelModel.update(params, {
      where: {
        id: params.id
      }
    })
  }

  // 删除标签
  deleteLabel(labelInfo: LabelDataInterface) {
    const params = Object.assign(labelInfo, {
      isDelete: 1
    })
    return LabelModel.update(params, {
      where: {
        id: labelInfo.id
      }
    })
  }
}

export default UserDao
