export default {
  methods: {
    verifyTypeMedicalSchedule (status, dateAppointment) {
      const typesMedicalSchedules = { Finalizada: false, Cancelada: false }
      if (status === 'Agendada') {
        if (this.verifyDateConsultAndDateNow(dateAppointment)) {
          return true
        }
        return false
      }
      return typesMedicalSchedules[status]
    },
    verifyDateConsultAndDateNow (dateAppointment) {
      const dateNow = this.$formatDateApi(Date.now())
      const dateRow = this.$formatDateApi(dateAppointment)
      return dateRow >= dateNow
    },
    verifyIfStatusIsCanceled (status) {
      return status !== 'Cancelada'
    },
    verifyPrescriptionMedicamentIsEmpty (receit) {
      if (Array.isArray(receit)) {
        return receit.length !== 0
      }
      return receit !== null
    }
  }
}
