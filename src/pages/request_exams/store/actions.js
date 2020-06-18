/* eslint-disable no-useless-catch */
import RequestExamsService from '../services/RequestExams'

export async function list ({ commit }, params) {
  try {
    const { data } = await RequestExamsService.list(params)
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    const { data } = await RequestExamsService.create(params)
    commit('SET_RESULT_CREATE', data)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await RequestExamsService.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await RequestExamsService.remove(params.id)
  } catch (error) {
    throw error
  }
}

export async function updateStatus ({ commit }, params) {
  try {
    await RequestExamsService.updateStatus(params, params.id)
  } catch (error) {
    throw error
  }
}
