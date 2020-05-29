<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Consulta" }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-6">
          Nome*:
          <q-input
            bottom-slots
            :error="$v.form.name.$error"
            v-model="form.name"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome é obrigatório"
            @input="$v.form.name.$touch"
          ></q-input>
        </div>
        <div class="col-6">
          Médico*:
          <q-select
            outlined
            v-model="form.employee_id"
            option-value="id"
            option-label="name"
            :options="employees"
            dense
            emit-value
            map-options
            error-message="Médico é obrigatória"
            :rules="[val => !!val]"
            :error="$v.form.employee_id.$error"
            @input="$v.form.employee_id.$touch"
          />
        </div>
        <div class="col-6">
          Data*:
          {{ form.date_appointment }}
          <q-input
            outlined
            v-model="form.date_appointment"
            dense
            @click="$refs.qDateAppointment.show()"
            :error="$v.form.date_appointment.$error"
            error-message="Data é obrigatória"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateAppointment" transition-show="scale" transition-hide="scale">
                  <q-date color="primary" v-model="form.date_appointment" :options="optionsFn" mask="DD/MM/YYYY HH:mm:ss" />
                  <q-time color="primary" v-model="form.date_appointment" mask="DD/MM/YYYY HH:mm:ss" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-6" v-if="!verifyNewPatient">
          Paciente*:
          <q-select
            outlined
            :options="optionsPatients"
            option-value="id"
            option-label="name"
            v-model="form.patient_id"
            dense
            use-input
            bottom-slots
            emit-value
            map-options
            @filter="filterPatient"
            :rules="[val => !!val]"
            :error="$v.form.patient_id.$error"
            @input="$v.form.patient_id.$touch"
            error-message="Paciente é obrigatório"
          >
          </q-select>
        </div>
        <div class="col-6">
          Novo Paciente?<br>
          <q-toggle v-model="verifyNewPatient" color="primary" label="Sim" />
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions class="row">
        <div class="col-12 text-right">
          <q-btn dense size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
          <q-btn dense size="sm" icon-right="save" label="Salvar" @click="save()" color="primary"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
import CreateValidator from './mixins/CreateValidator'
export default {
  mixins: [CreateValidator],
  data () {
    return {
      showModal: false,
      isEdit: false,
      optionsPatients: []
    }
  },
  computed: {
    ...mapState('Employees', ['employees']),
    ...mapState('Patients', ['patients'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Employees/list' })
    this.$list({ urlDispatch: 'Patients/list' })
    this.optionsPatients = [...this.patients]
  },
  methods: {
    filterPatient (val, update) {
      update(() => {
        if (val === '') {
          update(() => {
            this.optionsPatients = [...this.patients]
          })
        } else {
          const needle = val.toLowerCase()
          this.optionsPatients = this.patients.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    optionsFn (data) {
      return data <= date.formatDate(new Date(), 'YYYY/MM/DD HH:mm:ss')
    },
    openModal () {
      this.resetForm()
      this.showModal = true
      this.$v.form.$reset()
    },
    openModalEdit (form) {
      this.openModal()
      this.isEdit = true
      this.form = { ...form }
    },
    resetForm () {
      this.isEdit = false
      this.form = { ...this.formCopy }
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : 'Cadastrar'
    },
    prepareMedicalSchedule (form) {
      const medicalSchedulePrepared = { ...form, date_appointment: this.$formatDateAndHourApi(form.date_appointment), status: 'Agendada' }
      delete form.patient
      delete form.employee
      return medicalSchedulePrepared
    },
    save () {
      this.verifiyValidations()
      const medicalSchedule = this.prepareMedicalSchedule(this.form)
      this.$createOrUpdate({
        urlDispatch: this.isEdit === true ? 'MedicalSchedules/update' : 'MedicalSchedules/create',
        params: medicalSchedule,
        messages: this.isEdit === true ? `Consulta ${medicalSchedule.name} alterado com sucesso` : `Consulta ${medicalSchedule.name} cadastrado com sucesso`,
        callback: () => {
          this.showModal = false
          this.$list({
            urlDispatch: 'MedicalSchedules/list'
          })
        }
      })
    }
  }
}
</script>
