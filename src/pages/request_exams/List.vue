<template>
  <q-page>
    <div class="q-pa-md">
      <q-table title="Treats" :data="requestExams" :columns="columns" row-key="id" :filter="filter" separator="cell" :pagination.sync="pagination" table-style="material striped">
        <template v-slot:top>
          <q-input outlined dense label="Pesquisar" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-created_at="props">
          <q-td key="created_at" :props="props">{{ setHoursDate(new Date(props.row.created_at), 3) }} </q-td>
        </template>
        <template v-slot:body-cell-typeExam="props">
          <q-td key="typeExam" :props="props">{{ props.row.typeExam.name }} </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn
              v-if="verifyStatusResultExam(props.row.status)"
              size="sm"
              dense
              color="secondary"
              :title="'Gerar resultado de exame ' + props.row.typeExam.name + ', requisitado na data : ' + setHoursDate(new Date(props.row.created_at), 3)"
              icon="play_arrow"
              class="q-mr-sm"
              @click="setResultExam(props.row)"
            ></q-btn>
            <q-btn
              v-if="verifyStatusResultExam(props.row.status)"
              size="sm"
              dense
              color="negative"
              :title="'Cancelar requisição de exame ' + props.row.typeExam.name + ', requisitado na data : ' + setHoursDate(new Date(props.row.created_at), 3)"
              icon="not_interested"
              @click="cancelRequestExam(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <create-result-exam ref="ModalCreateResultExam"></create-result-exam>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import CreateResultExam from './components/CreateResultExam'
export default {
  components: {
    CreateResultExam
  },
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  computed: {
    ...mapState('RequestExams', ['requestExams', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'RequestExams/list' })
  },
  methods: {
    setResultExam (row) {
      this.$refs.ModalCreateResultExam.openModal(JSON.parse(JSON.stringify({ ...row, created_at: this.setHoursDate(new Date(row.created_at), 3) })))
    },
    setHoursDate (date, h) {
      date.setTime(date.getTime() + h * 60 * 60 * 1000)
      return this.$formatDateBr(this.$formatDateApi(date))
    },
    verifyStatusResultExam (status) {
      return status !== 'Finalizado' && status !== 'Cancelado'
    },
    cancelRequestExam (row) {
      this.$setDialogQuestion({
        title: 'Cancelar requisição de exame',
        message: `Tem certeza que deseja cancelar a requisição do exame ${row.typeExam.name} ?`,
        callback: () => {
          this.$createOrUpdate({
            urlDispatch: 'RequestExams/updateStatus',
            params: { id: row.id, status: 'Cancelado' },
            messages: 'Requisição de exame cancelada com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'RequestExams/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
