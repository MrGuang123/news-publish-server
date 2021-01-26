
export interface UserInterface {
  getUserList(params: UserListQueryInterface): Promise<UserDataInterface[]>
  getUserInfo(params: UserListQueryInterface): Promise<UserDataInterface[]>
  createUser(params: { [key:string]: any }): Promise<any> | string
  updateUser(params: UserListQueryInterface): Promise<UserDataInterface[]>
  deleteUser(params: UserListQueryInterface): Promise<UserDataInterface[]>
}

export interface UserListQueryInterface {
  type: number
  pageIndex?: number
  pageSize?: number
}

export interface UserCreateParams {
  [key: string]: string
}

export interface UserDataInterface {
  id: number
  userName: string
  password: string
  telephone: string
  roleIds: string
  token?: string
  createdAt?: any
  updatedAt?: any
}
