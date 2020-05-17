import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        name: 'Waldener Junior',
        birth_date: '2000-01-01',
        address: 'Travessa Curuzu',
        rg: '6134560',
        cpf: '03214569871',
        city: 'Belem',
        state: 'Para',
        sex: 'Masculino',
        email: 'waldener@gmail.com',
        password: '123',
        profile_id: 2
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
      birth_date: {
        required
      },
      address: {
        required
      },
      rg: {
        required
      },
      cpf: {
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
        required
      }
    }
  }
}
