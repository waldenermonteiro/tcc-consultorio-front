export function LIST (state, response) {
  state.medicalSchedules = response.data
}
export function LIST_DIFERENT (state, response) {
  state.medicalSchedulesCustom = response.data
}
