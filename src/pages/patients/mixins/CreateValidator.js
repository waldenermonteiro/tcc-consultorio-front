import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        name: '',
        birth_date: '',
        rg: '',
        cpf: '',
        cep: '',
        address: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        sex: '',
        email: ''
      },
      formCopy: this.form
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
      birth_date: {
        required
      },
      rg: {
        required
      },
      cpf: {
        required
      },
      cep: {
        required
      },
      address: {
        required
      },
      complement: {
        required
      },
      district: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      sex: {
        required
      },
      email: {
        required
      }
    }
  }
}
