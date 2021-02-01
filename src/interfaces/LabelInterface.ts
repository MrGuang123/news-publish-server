export interface LabelDataInterface {
  toJSON(): any
  id: number
  labelName: string
  labelDes?: string
  createdUserId: number
  isDelete: boolean
  createdAt?: any
  updatedAt?: any
}

export interface LabelListQueryInterface {
  type?: number
  pageIndex?:number
  pageSize?: number
}
export interface LabelInfoQueryInterface {
  id: number
}
export interface CommonCreateInterface {
  [key: string]: any
}

export interface LabelInterface {
  getLabelList(params: LabelListQueryInterface): Promise<LabelDataInterface[]>
  getLabelInfo(params: LabelInfoQueryInterface): Promise<LabelDataInterface> | any
  createLabel(params: CommonCreateInterface): Promise<any> | string
  updateLabel(params: CommonCreateInterface): Promise<any> | string | any
  deleteLabel(params: LabelInfoQueryInterface): Promise<any> | any
}
