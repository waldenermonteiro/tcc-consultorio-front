import UserService from '../services/UserService'
/* eslint-disable no-useless-catch */
export async function login ({ commit }, obj) {
  try {
    const { data } = await UserService.login(obj)
    const token = data.token.token
    const user = await decryptToken(data.user.token)
    let role = JSON.parse(user).user.profile.name
    role = role
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
    const roles = { roles: [role] }
    window.localStorage.setItem('token_clinic', token)
    window.localStorage.setItem('data_clinic', user)
    window.localStorage.setItem('roles_clinic', JSON.stringify(roles))
  } catch (error) {
    throw error
  }
}
export const logout = async ({ commit }) => {
  window.localStorage.removeItem('token_clinic')
  window.localStorage.removeItem('data_clinic')
  window.localStorage.removeItem('roles_clinic')
  location.reload()
}
export const decryptToken = token => {
  const tokenSplit = token.split('.')
  const data = JSON.stringify(JSON.parse(atob(tokenSplit[1])).data)
  return data
}
