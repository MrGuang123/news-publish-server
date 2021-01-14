import { UserDataInterface } from "./UserDataInterface";

export interface UserInterface {
  getUserList(): Promise<UserDataInterface[]>;
}
