<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 1200px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">Histórico do Paciente {{pacientName}}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-12">
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
            <q-tab name="mails" label="Consultas" />
            <q-tab name="alarms" label="Resultados de Exames" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <q-table
                title="Consultas"
                :data="medicalSchedules"
                :columns="columnsHistoryPatient"
                row-key="id"
                separator="cell"
                :pagination.sync="pagination"
                table-style="material striped"
              >
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
                <template v-slot:body-cell-employee="props">
                  <q-td key="employee" :props="props">
                    {{ props.row.employee.name }}
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td key="actions">
                    <q-btn
                      v-if="verifyPrescriptionMedicamentIsEmpty(props.row.prescription_medicaments)"
                      size="sm"
                      dense
                      color="grey"
                      :title="'Imprimir Receita Médica'"
                      icon="print"
                      class="q-mr-sm"
                      @click="printPrescriptionMedicament(props.row, props.row.date_appointment)"
                    ></q-btn>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
            <q-tab-panel name="alarms">
              <q-table
                title="Resultado de Exames"
                :data="medicalSchedules"
                :columns="columnsHistoryPatient"
                row-key="id"
                separator="cell"
                :pagination.sync="pagination"
                table-style="material striped"
              >
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
                <template v-slot:body-cell-employee="props">
                  <q-td key="employee" :props="props">
                    {{ props.row.employee.name }}
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td key="actions">
                    <q-btn
                      v-if="verifyPrescriptionMedicamentIsEmpty(props.row.prescription_medicaments)"
                      size="sm"
                      dense
                      color="grey"
                      :title="'Imprimir Receita Médica ' + props.row.prescription_medicaments"
                      icon="print"
                      class="q-mr-sm"
                      @click="printPrescriptionMedicament(props.row, props.row.date_appointment)"
                    ></q-btn>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row">
        <div class="col-12 text-right">
          <q-btn size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import ListFunctions from '../../medical_schedules/mixins/ListFunctions.mixin'
export default {
  mixins: [ListFunctions],
  data () {
    return {
      showModal: false,
      pagination: {
        rowsPerPage: 5
      },
      tab: 'mails',
      pacientName: ''
    }
  },
  computed: {
    ...mapState('Patients', ['resultCreate', 'optionsUfs', 'cepInformations']),
    ...mapState('MedicalSchedules', ['medicalSchedules', 'columnsHistoryPatient'])
  },
  methods: {
    openModal (row) {
      this.showModal = true
      this.pacientName = row.name
      this.$list({ urlDispatch: 'MedicalSchedules/list', params: { patient_id: row.id } })
    }
  }
}
</script>
