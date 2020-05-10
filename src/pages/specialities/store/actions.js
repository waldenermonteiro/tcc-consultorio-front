import SpecialitiesService from '../services/SpecialitiesService'

export async function list ({ commit }) {
  try {
    const { data } = await SpecialitiesService.list()
    commit('LIST', data)
  } catch (error) {
    return error
  }
}
export async function create ({ commit }, params) {
  try {
    await SpecialitiesService.create(params)
  } catch (error) {
    return error
  }
}
export async function update ({ commit }, params) {
  try {
    await SpecialitiesService.update(params, params.id)
  } catch (error) {
    return error
  }
}
export async function remove ({ commit }, params) {
  try {
    await SpecialitiesService.remove(params.id)
  } catch (error) {
    return error
  }
}
