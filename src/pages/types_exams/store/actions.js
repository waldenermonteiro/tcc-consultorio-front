import TypesExams from '../services/TypesExamsService'
/* eslint-disable no-useless-catch */
export async function list ({ commit }) {
  try {
    const { data } = await TypesExams.list()
    commit('LIST', data)
  } catch (error) {
    throw error
  }
}
export async function create ({ commit }, params) {
  try {
    await TypesExams.create(params)
  } catch (error) {
    throw error
  }
}
export async function update ({ commit }, params) {
  try {
    await TypesExams.update(params, params.id)
  } catch (error) {
    throw error
  }
}
export async function remove ({ commit }, params) {
  try {
    await TypesExams.remove(params.id)
  } catch (error) {
    throw error
  }
}
