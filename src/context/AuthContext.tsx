// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  ConfirmAccountParams,
  ForgotPasswordParams,
  ConfirmPasswordParams
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  confirmAccount: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  confirmPassword: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        console.log(storedToken)
        await axios
          .get(authConfig.meEndpoint, {
            params: {
              accessToken: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.response, role: 'admin' })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            router.replace('/login')
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    window.localStorage.removeItem('register')
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.response.AccessToken)

        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.response, role: 'admin' })
        window.localStorage.setItem('userData', JSON.stringify({ ...response.data.response, role: 'admin' }))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleLogout = (accessToken: string | null) => {
    axios.post(authConfig.logoutEndpoint, { access_token: accessToken }).then(() => {
      setUser(null)
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      router.push('/login')
    })
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        console.log(res)
        window.localStorage.setItem('register', JSON.stringify({ ...params }))
        router.push('/confirm-account')
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleConfirmAccount = ({ code }: ConfirmAccountParams, errorCallback?: ErrCallbackType) => {
    let dataLogin = window.localStorage.getItem('register')!
    const { email, password } = JSON.parse(dataLogin)

    axios
      .post(authConfig.confirmAccount, { code, email })
      .then(res => {
        console.log(res)

        handleLogin({ email, password })
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleForgotPassword = ({ email }: ForgotPasswordParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.forgotPassword, { email })
      .then(res => {
        router.push('/reset-password')
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleConfirmPassword = (
    { email, newPassword, code }: ConfirmPasswordParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.confirmPassword, { email, newPassword, code })
      .then(res => {
        handleLogin({ email, password: newPassword })
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    confirmAccount: handleConfirmAccount,
    forgotPassword: handleForgotPassword,
    confirmPassword: handleConfirmPassword
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
