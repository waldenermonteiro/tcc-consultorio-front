import EmployeesService from '../services/EmployeesService'
/* eslint-disable no-useless-catch */
export async function list ({ commit }, params) {
  try {
    const { data } = await EmployeesService.list(params)
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    await EmployeesService.create(params)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await EmployeesService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await EmployeesService.remove(params.id)
  } catch (error) {
    throw error
  }
}
