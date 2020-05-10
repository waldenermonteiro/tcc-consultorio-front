import ProfilesService from '../services/ProfilesService'

export async function list ({ commit }) {
  try {
    const { data } = await ProfilesService.list()
    commit('LIST', data)
  } catch (error) {
    return error
  }
}
export async function create ({ commit }, params) {
  try {
    await ProfilesService.create(params)
  } catch (error) {
    return error
  }
}
export async function update ({ commit }, params) {
  try {
    await ProfilesService.update(params, params.id)
  } catch (error) {
    return error
  }
}
export async function remove ({ commit }, params) {
  try {
    await ProfilesService.remove(params.id)
  } catch (error) {
    return error
  }
}
