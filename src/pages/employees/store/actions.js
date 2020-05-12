import EmployeesService from '../services/EmployeesService'

export async function list ({ commit }) {
  try {
    const { data } = await EmployeesService.list()
    commit('LIST', data)
  } catch (error) {
    return error
  }
}
export async function create ({ commit }, params) {
  try {
    await EmployeesService.create(params)
  } catch (error) {
    return error
  }
}
export async function update ({ commit }, params) {
  try {
    await EmployeesService.update(params, params.id)
  } catch (error) {
    return error
  }
}
export async function remove ({ commit }, params) {
  try {
    await EmployeesService.remove(params.id)
  } catch (error) {
    return error
  }
}
