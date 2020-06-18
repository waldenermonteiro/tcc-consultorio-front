/* eslint-disable no-useless-catch */
import ResultExamsService from '../services/ResultExamsService'

export async function list ({ commit }, params) {
  try {
    const { data } = await ResultExamsService.list(params)
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    await ResultExamsService.create(params)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await ResultExamsService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await ResultExamsService.remove(params.id)
  } catch (error) {
    throw error
  }
}
