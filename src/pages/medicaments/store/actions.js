import MedicamentsService from '../services/MedicamentsService'
/* eslint-disable no-useless-catch */
export async function list ({ commit }) {
  try {
    const { data } = await MedicamentsService.list()
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    await MedicamentsService.create(params)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await MedicamentsService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await MedicamentsService.remove(params.id)
  } catch (error) {
    throw error
  }
}
