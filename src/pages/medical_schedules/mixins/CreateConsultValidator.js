export default {
  data () {
    return {
      medicalSchedule: { date_appointment: '', patient: { name: '' } },
      form: { medicalSchedule: { prescription_medicaments: { medicaments: [{ name: '', dosage: '' }] } } },
      formRequestExam: { requestExam: [{ type_exam_id: '', observation: '' }] },
      optionsMedicaments: this.medicaments,
      optionsTypesExams: this.typesExams,
      showModal: false,
      isReceit: false,
      isExam: false
    }
  },
  methods: {
    verifiyValidations () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$setNotifyWarning('Existem campos inválidos')
        throw String('Existem campos inválidos')
      }
    }
  }
}
