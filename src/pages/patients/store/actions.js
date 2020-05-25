/* eslint-disable no-useless-catch */
import PatientsService from '../services/PatientsService'

export async function list ({ commit }) {
  try {
    const { data } = await PatientsService.list()
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    const { data } = await PatientsService.create(params)
    commit('SET_RESULT_CREATE', data)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await PatientsService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await PatientsService.remove(params.id)
  } catch (error) {
    throw error
  }
}
