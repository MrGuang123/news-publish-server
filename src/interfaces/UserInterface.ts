import { UserDataInterface } from "@interfaces/UserDataInterface";

export interface UserInterface {
  getUserList(params: UserListQueryInterface): Promise<UserDataInterface[]>;
}

export interface UserListQueryInterface {
  type: number
  pageIndex?: number
  pageSize?: number
}
