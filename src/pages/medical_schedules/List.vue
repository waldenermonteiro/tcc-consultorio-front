<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-center">
        <medical-schedules-filter class="col-12"></medical-schedules-filter>
      </div>
      <q-table
        title="Treats"
        :data="medicalSchedules"
        :columns="columns"
        row-key="id"
        :filter="filter"
        separator="cell"
        :pagination.sync="pagination"
        table-style="material striped"
      >
        <template v-slot:top>
          <q-space />
          <q-btn size="sm" icon="add" color="primary" label="Nova Consulta" @click="createMedicalSchedule()" />
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
        <template v-slot:body-cell-employee="props">
          <q-td key="employee" :props="props">
            {{ props.row.employee.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-specialitie="props">
          <q-td key="specialitie" :props="props">
            {{ props.row.employee.specialitie.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn
              v-if="!props.row.patient && verifyTypeMedicalSchedule(props.row.status, props.row.date_appointment)"
              size="sm"
              dense
              color="primary"
              :title="'Cadastrar Paciente'"
              icon="person"
              class="q-mr-sm"
              @click="createPatient(props.row)"
            ></q-btn>
            <q-btn
              v-if="verifyTypeMedicalSchedule(props.row.status, props.row.date_appointment)"
              size="sm"
              dense
              color="secondary"
              :title="'Editar consulta ' + props.row.name"
              icon="edit"
              class="q-mr-sm"
              @click="updateMedicalSchedule(props.row)"
            ></q-btn>
            <!-- <q-btn size="sm" dense color="negative" :title="'Excluir consulta ' + props.row.name" icon="delete" class="q-mr-sm" @click="removeMedicalSchedule(props.row)"></q-btn> -->
            <q-btn
              v-if="verifyTypeMedicalSchedule(props.row.status, props.row.date_appointment)"
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
      <medical-schedules-create ref="modalMedicalSchedules"></medical-schedules-create>
      <patient-create ref="modalPatientCreate"></patient-create>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
import PatientCreate from '../patients/Create'
import MedicalSchedulesFilter from './components/ListFilter'
import ListFunctions from './mixins/ListFunctions.mixin'
export default {
  mixins: [ListFunctions],
  components: {
    'medical-schedules-create': Create,
    'medical-schedules-filter': MedicalSchedulesFilter,
    'patient-create': PatientCreate
  },
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      rowSelected: {}
    }
  },
  computed: {
    ...mapState('MedicalSchedules', ['medicalSchedules', 'columns']),
    ...mapState('Patients', ['resultCreate'])
  },
  mounted () {
    this.$list({ urlDispatch: 'MedicalSchedules/list' })
  },
  methods: {
    createPatient (row) {
      this.rowSelected = row
      this.$refs.modalPatientCreate.openModal()
      this.$refs.modalPatientCreate.setFunctionCallback(this.finalizationCreateMedicalSchedule)
    },
    createMedicalSchedule () {
      this.$refs.modalMedicalSchedules.openModal()
    },
    finalizationCreateMedicalSchedule () {
      const medicalSchedule = { ...this.rowSelected }
      delete medicalSchedule.employee
      delete medicalSchedule.patient
      medicalSchedule.patient_id = this.resultCreate.id
      this.$createOrUpdate({
        urlDispatch: 'MedicalSchedules/update',
        params: medicalSchedule,
        callback: () => {
          this.showModal = false
          this.$list({
            urlDispatch: 'MedicalSchedules/list'
          })
        }
      })
    },
    updateMedicalSchedule (row) {
      this.$refs.modalMedicalSchedules.openModalEdit(JSON.parse(JSON.stringify(row)))
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
    },
    removeMedicalSchedule (row) {
      this.$setDialogQuestion({
        title: 'Excluir Consulta',
        message: `Tem certeza que deseja excluir a consulta ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'MedicalSchedules/remove',
            params: row,
            messages: 'Consulta excluído com sucesso',
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
