export function LIST (state, response) {
  state.patients = response.data
}
export function SET_RESULT_CREATE (state, response) {
  state.resultCreate = response.data
}
export function SET_CEP_INFORMATIONS (state, response) {
  state.cepInformations = response
}
