import { AxiosError } from 'axios'

export type ErrCallbackType = (err: AxiosError<any, any>) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  email: string
  name: string
  password: string
}

export type ConfirmAccountParams = {
  code: string
}

export type ForgotPasswordParams = {
  email: string
}

export type ConfirmPasswordParams = {
  email: string
  code: string
  newPassword: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  name: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  user: UserDataType | null
  logout: (accessToken: string | null) => void
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  confirmAccount: (params: ConfirmAccountParams, errorCallback?: ErrCallbackType) => void
  forgotPassword: (params: ForgotPasswordParams, errorCallback?: ErrCallbackType) => void
  confirmPassword: (params: ConfirmPasswordParams, errorCallback?: ErrCallbackType) => void
}
