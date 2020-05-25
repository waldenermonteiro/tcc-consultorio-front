<template>
  <div class="q-pa-sm">
    <div class="row justify-center q-col-gutter-sm ">
      <div class="col-3">
        Descrição da Consulta:
        <q-input @keyup.enter="send()" outlined dense v-model.trim="formFilter.name"> </q-input>
      </div>
      <div class="col-3">
        Médico:
        <q-select outlined v-model="formFilter.employee_id" option-value="id" option-label="name" :options="employees" dense emit-value map-options />
      </div>
      <div class="col-3">
        Paciente*:
        <q-select
          outlined
          :options="optionsPatients"
          option-value="id"
          option-label="name"
          v-model="formFilter.patient_id"
          dense
          use-input
          emit-value
          map-options
          @filter="filterPatient"
        >
        </q-select>
      </div>
      <div class="col-3">
        Data*:
        <q-input outlined v-model="formFilter.date_appointment" dense @click="$refs.qDateAppointment.show()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateAppointment" transition-show="scale" transition-hide="scale">
                <q-date color="primary" v-model="formFilter.date_appointment" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formFilter: {
        name: '',
        employee_id: '',
        patient_id: '',
        date_appointment: ''
      },
      formFilterCopy: { ...this.formFilter },
      optionsPatients: this.patients
    }
  },
  mounted () {
    this.$list({ urlDispatch: 'Employees/list' })
    this.$list({ urlDispatch: 'Patients/list' })
  },
  computed: {
    ...mapState('Employees', ['employees']),
    ...mapState('Patients', ['patients'])
  },
  methods: {
    filterPatient (val, update, abort) {
      update(() => {
        if (val.length < 2) {
          abort()
          return ''
        } else {
          const needle = val.toLowerCase()
          this.optionsPatients = this.patients.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    prepareParams (form) {
      const formCustom = { ...form }
      formCustom.date_appointment = this.$formatDateBrInApi(this.formFilter.date_appointment)
      return formCustom
    },
    send () {
      const params = this.prepareParams(this.formFilter)
      this.$list({ urlDispatch: 'MedicalSchedules/list', params })
    },
    clearForm () {
      this.formFilter = { ...this.formFilterCopy }
      this.$list({
        urlDispatch: 'MedicalSchedules/list',
        callback: () => {
          this.optionsPatients = this.patients
        }
      })
    }
  }
}
</script>
