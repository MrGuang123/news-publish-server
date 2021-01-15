
export interface AuthUser {
  id: number
  telephone: string
  roleIds: string
  iat?: number
  exp?: number
}

export interface AuthInterface {
  validate(token: string): Promise<AuthUser>
  getToken(userModel: AuthUser): string
}
