import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        name: '',
        date_appointment: '',
        patient_id: null,
        employee_id: 0,
        status: 'Agendada'
      },
      formCopy: { ...this.form },
      verifyNewPatient: false
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
  },
  validations: {
    form: {
      name: {
        required
      },
      date_appointment: {
        required
      },
      employee_id: {
        required
      },
      patient_id: {
        required: requiredIf(function () {
          if (this.verifyNewPatient) {
            return false
          }
          return true
        })
      }
    }
  }
}
