<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-center">
        <medical-schedules-filter action="ResultExams/list" class="col-12" :hideDate="true" :hideStatus="true"></medical-schedules-filter>
      </div>
      <q-table title="" :data="resultExams" :columns="columns" row-key="id" separator="cell" :pagination.sync="pagination" table-style="material striped">
        <template v-slot:top>
          <q-space />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-created_at="props">
          <q-td key="created_at" :props="props">
            {{ $formatDateAndHourBrEmptyT(props.row.created_at) }}
          </q-td>
        </template>
        <template v-slot:body-cell-medicalSchedule="props">
          <q-td key="medicalSchedule" :props="props">
            {{ props.row.medicalSchedule.employee.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-patient="props">
          <q-td key="patient" :props="props">
            {{ props.row.medicalSchedule.patient.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions">
            <q-btn size="sm" dense color="grey" :title="'Imprimir Resultado de Exame'" icon="print" class="q-mr-sm absolute-center" @click="printResultExam(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import printDocument from './Print'
import MedicalSchedulesFilter from '../medical_schedules/components/ListFilter'
export default {
  components: {
    'medical-schedules-filter': MedicalSchedulesFilter
  },
  data () {
    return {
      showModal: false,
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  mounted () {
    this.$list({
      urlDispatch: 'ResultExams/list'
    })
  },
  computed: {
    ...mapState('ResultExams', ['resultExams', 'columns'])
  },
  methods: {
    printResultExam (resultExam) {
      console.log(resultExam)
      printDocument(resultExam)
    }
  }
}
</script>
