export function LIST (state, response) {
  state.patients = response.data
}
export function SET_RESULT_CREATE (state, response) {
  console.log(response)
  state.resultCreate = response.data
}
