
export interface AuthUser {
  toJSON(): any;
  id: number
  userName: string
  telephone: string
  roleIds: string
  iat?: number
  exp?: number
}

export interface LoginParam {
  userName: string
  password: string
}

export interface LoginResult {
  id: number
  username: string
  telephone: string
  roleIds: string
  iat?: number
  exp?: number
}

export interface LogoutParam {
  username: string
}

export interface AuthInterface {
  validate(token: string): Promise<AuthUser>
  getToken(userModel: AuthUser): string
}

export interface AuthControllerInterface {
  login(params: LoginParam): Promise<Object>
  logout(params: LogoutParam): string
}
