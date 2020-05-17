<template>
  <div class="q-pa-sm">
    <div class="row justify-center q-col-gutter-sm ">
      <div class="col-3">
        Descrição da Consulta:
        <q-input @keyup.enter="send()" outlined dense v-model.trim="formFilter.name"> </q-input>
      </div>
      <div class="col-3">
        Médico:
        <q-select outlined v-model="formFilter.employee_id" option-value="id" option-label="name" :options="employees" dense emit-value map-options  />
      </div>
      <div class="col-7">
        <div class="row justify-center q-col-gutter-sm">
          <div class="col-3">
            <q-btn dense size="sm" class="full-width" label="Limpar" color="grey" icon="delete" @click="clearForm()"></q-btn>
          </div>
          <div class="col-3">
            <q-btn dense size="sm" class="full-width" label="Buscar" color="primary" icon="search" @click="send()"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListValidator from '../mixins/ListValidator.js'
import { mapState } from 'vuex'
export default {
  mixins: [ListValidator],
  data () {
    return {}
  },
  mounted () {
    this.$list({ urlDispatch: 'Employees/list' })
  },
  computed: {
    ...mapState('Employees', ['employees'])
  },
  methods: {
    send () {
      //   this.verifiyValidations()
      this.$list({ urlDispatch: 'MedicalSchedules/list', params: this.formFilter })
    },
    clearForm () {
      this.form = { ...this.formCopy }
      this.$list({ urlDispatch: 'MedicalSchedules/list', params: this.formFilter })
      //   this.$v.form.$reset()
    }
  }
}
</script>
