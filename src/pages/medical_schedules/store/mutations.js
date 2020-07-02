export function LIST (state, response) {
  state.medicalSchedules = response.data
}
export function LIST_DIFERENT (state, response) {
  state.medicalSchedulesCustom = response.data
}
export function SET_MEDICAL_SCHEDULE_FINISHED (state, response) {
  state.medicalSheduleFinished = response.data
}
