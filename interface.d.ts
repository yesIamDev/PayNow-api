/**
 * - User -
 */
export interface IUser {
  username:string
  password: string
  email: string
}

export interface IQuerry {
  page: number
  limit: number
  status?: boolean
  orderBy: string
}

export interface IFindByKeyValue {
  key: string
  value: string
}