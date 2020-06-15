import { requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      medicalSchedule: { date_appointment: '', patient: { name: '' } },
      form: { medicalSchedule: { observation: '', prescription_medicaments: { medicaments: [] } } },
      formRequestExam: { requestExam: [] },
      optionsMedicaments: this.medicaments,
      optionsTypesExams: this.typesExams,
      showModal: false
    }
  },
  methods: {
    verifiyValidations () {
      this.$v.form.medicalSchedule.prescription_medicaments.medicaments.$touch()
      this.$v.formRequestExam.requestExam.$touch()
      if (this.$v.formRequestExam.requestExam.$error || this.$v.form.medicalSchedule.prescription_medicaments.medicaments.$error) {
        this.$setNotifyWarning('Existem campos inválidos')
        throw String('Existem campos inválidos')
      }
    }
  },
  validations: {
    form: {
      medicalSchedule: {
        prescription_medicaments: {
          medicaments: {
            $each: {
              name: {
                required: requiredIf(function () {
                  return this.form.medicalSchedule.prescription_medicaments.medicaments.length !== 0
                })
              },
              qtd: {
                required: requiredIf(function () {
                  return this.form.medicalSchedule.prescription_medicaments.medicaments.length !== 0
                })
              },
              dosage: {
                required: requiredIf(function () {
                  return this.form.medicalSchedule.prescription_medicaments.medicaments.length !== 0
                })
              }
            }
          }
        }
      }
    },
    formRequestExam: {
      requestExam: {
        $each: {
          type_exam_id: {
            required: requiredIf(function () {
              return this.formRequestExam.requestExam.length !== 0
            })
          },
          observation: {
            required: requiredIf(function () {
              return this.formRequestExam.requestExam.length !== 0
            })
          }
        }
      }
    }
  }
}
