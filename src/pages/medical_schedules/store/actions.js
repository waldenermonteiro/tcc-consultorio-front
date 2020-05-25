import MedicalSchedulesService from '../services/MedicalSchedulesService'
/* eslint-disable no-useless-catch */
export async function list ({ commit }, params) {
  try {
    const { data } = await MedicalSchedulesService.list(params)
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    await MedicalSchedulesService.create(params)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await MedicalSchedulesService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function updateStatus ({ commit }, params) {
  try {
    await MedicalSchedulesService.updateStatus(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await MedicalSchedulesService.remove(params.id)
  } catch (error) {
    throw error
  }
}
