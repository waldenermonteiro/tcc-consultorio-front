// import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      formFilter: {
        name: '',
        employee_id: ''
      },
      formCopy: { ...this.formFilter }
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
  }
  //   validations: {
  //     form: {
  //       name: {
  //         required
  //       },
  //       email: {
  //         required
  //       },
  //       profile_id: {
  //         required
  //       },
  //       specialitie_id: {
  //         required
  //       },
  //       password: {
  //         required: requiredIf(function () {
  //           if (this.form.id) {
  //             return false
  //           }
  //           return true
  //         })
  //       }
  //     }
  //   }
}
