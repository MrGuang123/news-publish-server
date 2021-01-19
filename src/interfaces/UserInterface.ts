import { UserDataInterface } from "@interfaces/UserDataInterface"

export interface UserInterface {
  getUserList(params: UserListQueryInterface): Promise<UserDataInterface[]>
  getUserInfo(params: UserListQueryInterface): Promise<UserDataInterface[]>
  createUser(params: UserListQueryInterface): Promise<UserDataInterface[]>
  updateUser(params: UserListQueryInterface): Promise<UserDataInterface[]>
  deleteUser(params: UserListQueryInterface): Promise<UserDataInterface[]>
}

export interface UserListQueryInterface {
  type: number
  pageIndex?: number
  pageSize?: number
}
