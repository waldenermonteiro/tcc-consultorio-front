import MedicamentsService from '../services/MedicamentsService'

export async function list ({ commit }) {
  try {
    const { data } = await MedicamentsService.list()
    commit('LIST', data)
  } catch (error) {
    return error
  }
}
export async function create ({ commit }, params) {
  try {
    await MedicamentsService.create(params)
  } catch (error) {
    return error
  }
}
export async function update ({ commit }, params) {
  try {
    await MedicamentsService.update(params, params.id)
  } catch (error) {
    return error
  }
}
export async function remove ({ commit }, params) {
  try {
    await MedicamentsService.remove(params.id)
  } catch (error) {
    return error
  }
}
