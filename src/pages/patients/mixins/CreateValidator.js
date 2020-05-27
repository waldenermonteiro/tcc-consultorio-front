import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        name: 'Waldener Junior',
        birth_date: '',
        rg: '6134560',
        cpf: '03214569871',
        cep: '',
        address: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        sex: 'Masculino',
        email: 'waldener@gmail.com',
        password: '123',
        profile_id: 2
      },
      formCopy: this.form
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
      },
      password: {
        required: requiredIf(function () {
          if (this.form.id) {
            return false
          }
          return true
        })
      }
    }
  }
}
