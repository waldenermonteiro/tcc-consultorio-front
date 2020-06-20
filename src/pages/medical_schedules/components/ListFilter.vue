<template>
  <div class="q-pa-sm">
    <div class="row justify-center q-col-gutter-sm ">
      <div class="col-3">
        Médico:
        <q-select outlined v-model="formFilter.employee_id" option-value="id" option-label="name" :options="employees" dense emit-value map-options>
          <template v-if="formFilter.employee_id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('employee_id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-3" v-if="!hidePatient">
        Paciente:
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
          hint="Digite para pesquisar um paciente"
        >
          <template v-if="formFilter.patient_id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('patient_id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-3" v-if="!hideDate">
        Data:
        <q-input outlined v-model="formFilter.date_appointment" dense @click="$refs.qDateAppointment.show()">
          <template v-slot:append>
            <q-icon v-if="formFilter.date_appointment" name="cancel" @click="clearInput('date_appointment')" class="cursor-pointer" />
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateAppointment" transition-show="scale" transition-hide="scale">
                <q-date color="primary" v-model="formFilter.date_appointment" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-3" v-if="!hideStatus">
        Status:
        <q-select option-value="value" option-label="label" emit-value map-options outlined :options="optionsStatus" v-model="formFilter.status" dense>
          <template v-if="formFilter.status" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('status')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-7">
        <div class="row justify-center q-col-gutter-sm">
          <div class="col-3">
            <q-btn size="sm" class="full-width" label="Limpar" color="grey" icon="delete" @click="clearForm()"></q-btn>
          </div>
          <div class="col-3">
            <q-btn size="sm" class="full-width" label="Buscar" color="primary" icon="search" @click="send()"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    hidePatient: {
      required: false,
      default: false
    },
    hideStatus: {
      required: false,
      default: false
    },
    hideDate: {
      required: false,
      default: false
    },
    action: {
      required: false
    }
  },
  data () {
    return {
      formFilter: {
        employee_id: '',
        patient_id: '',
        date_appointment: '',
        status: ''
      },
      formFilterCopy: { ...this.formFilter },
      optionsPatients: this.patients
    }
  },
  mounted () {
    this.$list({ urlDispatch: 'Employees/list' })
    if (!this.hidePatient) this.$list({ urlDispatch: 'Patients/list' })
  },
  computed: {
    ...mapState('MedicalSchedules', ['optionsStatus']),
    ...mapState('Employees', ['employees']),
    ...mapState('Patients', ['patients'])
  },
  methods: {
    setForm (form) {
      this.formFilter = { ...form }
    },
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
      this.$list({ urlDispatch: this.action, params })
    },
    clearForm () {
      this.formFilter = { ...this.formFilterCopy }
      this.$list({
        urlDispatch: this.action,
        callback: () => {
          this.optionsPatients = this.patients
        }
      })
    },
    clearInput (prop) {
      this.formFilter[prop] = ''
      this.send()
    }
  }
}
</script>
