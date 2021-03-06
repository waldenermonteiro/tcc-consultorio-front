<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="patients"
        :columns="columns"
        row-key="id"
        :filter="filterAltered"
        separator="cell"
        :pagination.sync="pagination"
        table-style="material striped"
      >
        <template v-slot:top>
          <q-input outlined dense label="Pesquisar" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn size="sm" icon="add" color="primary" label="Novo Paciente" @click="createPatient()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-cpf="props">
          <q-td key="cpf" :props="props">
            {{ $formatCPFCNPJ(props.row.cpf, "cpf") }}
          </q-td>
        </template>
        <template v-slot:body-cell-birth_date="props">
          <q-td key="birth_date" :props="props">
            {{ $formatDateBr(props.row.birth_date) }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn size="sm" dense color="info" :title="'Histórico do paciente ' + props.row.name" icon="history" class="q-mr-sm" @click="historyPatient(props.row)"></q-btn>
            <q-btn size="sm" dense color="positive" :title="'Visualizar paciente ' + props.row.name" icon="search" class="q-mr-sm" @click="viewPatient(props.row)"></q-btn>
            <q-btn size="sm" dense color="secondary" :title="'Editar paciente ' + props.row.name" icon="edit" class="q-mr-sm" @click="updatePatient(props.row)"></q-btn>
            <q-btn size="sm" dense color="negative" :title="'Excluir paciente ' + props.row.name" icon="delete" @click="removePatient(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <patients-create ref="modalPatient"></patients-create>
      <patients-history ref="modalHistoryPatient"></patients-history>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
import History from './components/History'
export default {
  components: {
    'patients-create': Create,
    'patients-history': History
  },
  data () {
    return {
      filter: '',
      filterAltered: '',
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  watch: {
    filter: function () {
      this.filterAltered = this.filter.replace(/[^0-9]+/g, '')
    }
  },
  computed: {
    ...mapState('Patients', ['patients', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Patients/list' })
  },
  methods: {
    createPatient () {
      this.$refs.modalPatient.openModal()
    },
    updatePatient (row) {
      this.$refs.modalPatient.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    viewPatient (row) {
      this.$refs.modalPatient.openModalView(JSON.parse(JSON.stringify(row)))
    },
    historyPatient (row) {
      this.$refs.modalHistoryPatient.openModal(JSON.parse(JSON.stringify(row)))
    },
    removePatient (row) {
      this.$setDialogQuestion({
        title: 'Excluir Paciente',
        message: `Tem certeza que deseja excluir o paciente ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'Patients/remove',
            params: row,
            messages: 'Paciente excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'Patients/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
