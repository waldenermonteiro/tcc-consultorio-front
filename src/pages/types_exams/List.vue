<template>
  <q-page>
    <div class="q-pa-md">
      <q-table title="Treats" :data="typesExams" :columns="columns" row-key="id" :filter="filter" separator="cell" :pagination.sync="pagination" table-style="material striped">
        <template v-slot:top>
          <q-input outlined dense label="Pesquisar" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn size="sm" icon="add" color="primary" label="Novo Tipo de Exame" @click="createTypeExam()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn
              size="sm"
              dense
              color="positive"
              :title="'Visualizar informações do tipo de exame ' + props.row.name"
              icon="search"
              class="q-mr-sm"
              @click="viewTypeExam(props.row)"
            ></q-btn>
            <q-btn size="sm" dense color="secondary" :title="'Editar tipo de exame ' + props.row.name" icon="edit" class="q-mr-sm" @click="updateTypeExam(props.row)"></q-btn>
            <q-btn size="sm" dense color="negative" :title="'Excluir tipo de exame ' + props.row.name" icon="delete" @click="removeTypeExam(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <specialities-create ref="modalTypeExam"></specialities-create>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
export default {
  components: {
    'specialities-create': Create
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
    ...mapState('TypesExams', ['typesExams', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'TypesExams/list' })
  },
  methods: {
    createTypeExam () {
      this.$refs.modalTypeExam.openModal()
    },
    updateTypeExam (row) {
      this.$refs.modalTypeExam.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    viewTypeExam (row) {
      this.$refs.modalTypeExam.openModalView(JSON.parse(JSON.stringify(row)))
    },
    removeTypeExam (row) {
      this.$setDialogQuestion({
        title: 'Excluir Tipo de Exame',
        message: `Tem certeza que deseja excluir o tipo de exame ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'TypesExams/remove',
            params: row,
            messages: 'Tipo de exame excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'TypesExams/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
