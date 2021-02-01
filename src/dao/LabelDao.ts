import LabelModel from '@models/LabelModel'
import { LabelDataInterface, LabelListQueryInterface, CommonCreateInterface } from '@interfaces/LabelInterface'

class UserDao {
  // 获取标签列表
  getLabelList(params: LabelListQueryInterface) {
    return LabelModel.findAll({
      where: {
        isDelete: 0
      },
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
