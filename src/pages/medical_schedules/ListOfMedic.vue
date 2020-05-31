<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-center">
        <medical-schedules-filter ref="medicalScheduleFilter" :hidePatient="true" :hideDescription="true" :setForm="formFilter" class="col-12"></medical-schedules-filter>
      </div>
      <q-table
        title="Treats"
        :data="medicalSchedules"
        :columns="columnsListOfMedic"
        row-key="id"
        :filter="filter"
        separator="cell"
        :pagination.sync="pagination"
        table-style="material striped"
      >
        <template v-slot:top>
          <q-space />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-date_appointment="props">
          <q-td key="date_appointment" :props="props">
            {{ $formatDateAndHourBr(props.row.date_appointment) }}
          </q-td>
        </template>
        <template v-slot:body-cell-patient="props">
          <q-td key="patient" :props="props">
            <span :class="!props.row.patient ? 'text-red' : ''">{{ props.row.patient ? props.row.patient.name : "Paciente não cadastrado" }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props" v-if="props.row.status !== 'Cancelada'">
            <q-btn
              size="sm"
              dense
              color="secondary"
              :title="'Iniciar consulta do paciente' + props.row.patient.name"
              icon="play_arrow"
              class="q-mr-sm"
              @click="startConsult(props.row)"
            ></q-btn>
            <q-btn
              size="sm"
              dense
              color="grey"
              :title="'Imprimir Receita Médica ' + props.row.name"
              icon="print"
              class="q-mr-sm"
              @click="printPrescriptionMedicament(props.row)"
            ></q-btn>
            <q-btn
              size="sm"
              dense
              color="negative"
              :title="'Cancelar consulta ' + props.row.name"
              icon="not_interested"
              class="q-mr-sm"
              @click="canceledMedicalSchedule(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
      <appointment-patient ref="modalAppointmentPatient"></appointment-patient>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import AppointmentPatient from './components/AppointmentPatient'
import MedicalSchedulesFilter from './components/ListFilter'
import printDocument from './Print'
export default {
  components: {
    'appointment-patient': AppointmentPatient,
    'medical-schedules-filter': MedicalSchedulesFilter
  },
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      formFilter: {
        name: '',
        employee_id: JSON.parse(localStorage.getItem('data_clinic')).id,
        patient_id: '',
        date_appointment: this.$formatDateBr(this.$formatDateApi(new Date()))
      },
      rowSelected: {}
    }
  },
  computed: {
    ...mapState('MedicalSchedules', ['medicalSchedules', 'columnsListOfMedic']),
    ...mapState('Patients', ['resultCreate'])
  },
  mounted () {
    this.$refs.medicalScheduleFilter.setForm(this.formFilter)
    this.$list({ urlDispatch: 'MedicalSchedules/list', params: { ...this.formFilter, date_appointment: this.$formatDateBrInApi(this.formFilter.date_appointment) } })
  },
  methods: {
    startConsult (row) {
      this.$refs.modalAppointmentPatient.openModal(row)
    },
    printPrescriptionMedicament (row) {
      printDocument(JSON.stringify(row))
    },
    canceledMedicalSchedule (row) {
      this.$setDialogQuestion({
        title: 'Cancelar Consulta',
        message: `Tem certeza que deseja cancelar a consulta ${row.name} ?`,
        callback: () => {
          this.$createOrUpdate({
            urlDispatch: 'MedicalSchedules/updateStatus',
            params: { id: row.id, status: 'Cancelada' },
            messages: 'Consulta cancelada com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'MedicalSchedules/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>