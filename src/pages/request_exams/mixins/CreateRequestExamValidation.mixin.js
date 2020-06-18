import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        observation: ''
      },
      formCopy: { ...this.form }
    }
  },
  methods: {
    verifyValidations () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$setNotifyWarning('Existem campos inválidos')
        throw String('Existem campos inválidos')
      }
    }
  },
  validations: {
    form: {
      observation: {
        required
      }
    }
  }
}
