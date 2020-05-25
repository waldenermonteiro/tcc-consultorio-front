import UserService from '../services/UserService'
/* eslint-disable no-useless-catch */
export async function login ({ commit }, obj) {
  try {
    const { data } = await UserService.login(obj)
    const token = data.token.token
    const user = await decryptToken(data.user.token)
    const role = JSON.parse(user).user.profile.name
    const roles = { roles: [role] }
    window.localStorage.setItem('token_clinic', token)
    window.localStorage.setItem('data_clinic', user)
    window.localStorage.setItem('roles_clinic', JSON.stringify(roles))
  } catch (error) {
    throw error
  }
}

// const login = ({ commit }, user) => {
//   return new Promise((resolve, reject) => {
//     commit('authRequest')
//     HTTPClient.post('users/login', user)
//       .then(resp => {
//         console.log(resp)
//         // const token = resp.data.token
//         // window.localStorage.setItem('token_travessia_admin', token)
//         // const data = decryptToken(token)
//         // window.localStorage.setItem('data_travessia_admin', data)
//         // HTTPClient.defaults.headers.common.Authorization = token
//         // commit('authSuccess', resp.data)
//         resolve(resp)
//       })
//       .catch(err => {
//         commit('authError')
//         localStorage.removeItem('token_travessia_admin')
//         localStorage.removeItem('data_travessia_admin')
//         reject(err)
//       })
//   })
// }
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
