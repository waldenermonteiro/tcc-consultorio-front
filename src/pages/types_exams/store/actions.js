import TypesExams from '../services/TypesExamsService'

export async function list ({ commit }) {
  try {
    const { data } = await TypesExams.list()
    commit('LIST', data)
  } catch (error) {
    return error
  }
}
export async function create ({ commit }, params) {
  try {
    await TypesExams.create(params)
  } catch (error) {
    return error
  }
}
export async function update ({ commit }, params) {
  try {
    await TypesExams.update(params, params.id)
  } catch (error) {
    return error
  }
}
export async function remove ({ commit }, params) {
  try {
    await TypesExams.remove(params.id)
  } catch (error) {
    return error
  }
}
