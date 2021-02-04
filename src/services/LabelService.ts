import { LabelInterface, LabelListQueryInterface, LabelInfoQueryInterface, CommonCreateInterface } from '@interfaces/LabelInterface'
import LabelDao from '@dao/LabelDao'

class LabelService implements LabelInterface {
  public labelDao: LabelDao
  constructor() {
    this.labelDao = new LabelDao()
  }
  async getLabelList(params: LabelListQueryInterface) {
    params.pageSize = Number(params.pageSize)
    params.pageIndex = Number(params.pageIndex)

    const param = Object.assign({
      pageSize: 10,
      pageIndex: 1
    }, params)

    return this.labelDao.getLabelList(param)
  }

  async getLabelInfo(params: LabelInfoQueryInterface) {
    const { id } = params

    try {
      const result = await this.labelDao.getLabelInfo(id)
      return result
    }catch(e) {
      return undefined
    }
  }

  async createLabel(params: CommonCreateInterface) {
    const mustParams = ['labelName', 'createdUserId']
    const paramEnough = mustParams.every(item => params[item] !== 'undefined')

    if(!paramEnough) {
      return 'ErrorInfo:400:创建标签参数不足'
    }

    try {
      const userInfo = await this.labelDao.createLabel(params)
      const result = await this.labelDao.getLabelInfo(userInfo.id)

      return result
    }catch (e) {
      return 'ErrorInfo:400:创建标签失败'
    }
  }

  async updateLabel(params: CommonCreateInterface) {
    const mustParams = ['labelName', 'createdUserId']
    const paramEnough = mustParams.every(item => params[item] !== 'undefined')

    if(!paramEnough) {
      return 'ErrorInfo:400:创建标签参数不足'
    }

    params.id = Number(params.id)

    try {
      const labelInfo = this.labelDao.getLabelInfo(params.id)
      if(labelInfo) {
        await this.labelDao.updateLabel(params)
        return '修改标签成功'
      }else {
        return '该标签不存在'
      }
    }catch(e) {
      return '修改标签失败'
    }

  }

  async deleteLabel(params: LabelInfoQueryInterface) {
    const { id } = params

    try {
      const labelInfo = await this.labelDao.getLabelInfo(Number(id))
      if(labelInfo) {
        let labelJson = labelInfo.toJSON()
        await this.labelDao.deleteLabel(labelJson)
        return '删除标签成功'
      }else {
        return '标签不存在'
      }
    }catch(e) {
      return '删除标签失败'
    }
  }
}

export default LabelService
