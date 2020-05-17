import { required } from 'vuelidate/lib/validators'
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
      formCopy: { ...this.form }
    }
  },
  methods: {
    verifiyValidations () {
      console.log(this)
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
      }
    }
  }
}
