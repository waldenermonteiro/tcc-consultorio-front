import { requiredIf } from 'vuelidate/lib/validators'
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
                  return this.isReceit
                })
              },
              dosage: {
                required: requiredIf(function () {
                  return this.isReceit
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
              return this.isExam
            })
          },
          observation: {
            required: requiredIf(function () {
              return this.isExam
            })
          }
        }
      }
    }
  }
}
