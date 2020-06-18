import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        name: ''
      },
      formCopy: { ...this.form }
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
      }
    }
  }
}
