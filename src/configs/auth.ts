export default {
  meEndpoint: 'http://localhost:3001/dev/users/me',
  loginEndpoint: 'http://localhost:3001/dev/auth/login',
  logoutEndpoint: 'http://localhost:3001/dev/auth/account/logout',
  registerEndpoint: 'http://localhost:3001/dev/users/create',
  confirmAccount: 'http://localhost:3001/dev/auth/account/confirm',
  forgotPassword: 'http://localhost:3001/dev/auth/account/forgot-password',
  confirmPassword: 'http://localhost:3001/dev/auth/account/password/confirm',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
