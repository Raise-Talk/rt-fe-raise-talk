export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/users/me' ?? 'http://localhost:3001/dev/users/me'}`,
  loginEndpoint: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/auth/login' ?? 'http://localhost:3001/dev/auth/login'
  }`,
  logoutEndpoint: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/auth/account/logout' ??
    'http://localhost:3001/dev/auth/account/logout'
  }`,
  registerEndpoint: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/users/create' ?? 'http://localhost:3001/dev/users/create'
  }`,
  confirmAccount: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/auth/account/confirm' ??
    'http://localhost:3001/dev/auth/account/confirm'
  }`,
  forgotPassword: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/auth/account/forgot-password' ??
    'http://localhost:3001/dev/auth/account/forgot-password'
  }`,
  confirmPassword: `${
    process.env.NEXT_PUBLIC_API_MS_USERS_URL + '/dev/auth/account/password/confirm' ??
    'http://localhost:3001/dev/auth/account/password/confirm'
  }`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
