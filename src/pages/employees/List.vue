<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-center">
        <employees-filter class="col-12"></employees-filter>
      </div>
      <q-table title="Treats" :data="employees" :columns="columns" row-key="id" :filter="filter" separator="cell" :pagination.sync="pagination" table-style="material striped">
        <template v-slot:top>
          <q-space />
          <q-btn size="sm" icon="add" color="primary" label="Novo Funcionário" @click="createEmployee()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-user="props">
          <q-td key="user" :props="props">
            {{ props.row.user.email }}
          </q-td>
        </template>
        <template v-slot:body-cell-specialitie="props">
          <q-td key="specialitie" :props="props">
            {{ props.row.specialitie.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-profile="props">
          <q-td key="profile" :props="props">
            {{ props.row.user.profile.name }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn size="sm" dense color="positive" :title="'Visualizar funcionário ' + props.row.name" icon="search" class="q-mr-sm" @click="viewEmployee(props.row)"></q-btn>
            <q-btn size="sm" dense color="secondary" :title="'Editar funcionário ' + props.row.name" icon="edit" class="q-mr-sm" @click="updateEmployee(props.row)"></q-btn>
            <q-btn size="sm" dense color="negative" :title="'Excluir funcionário ' + props.row.name" icon="delete" @click="removeEmployee(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <employees-create ref="modalEmployee"></employees-create>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
import EmployeesFilter from './components/ListFilter'
export default {
  components: {
    'employees-create': Create,
    'employees-filter': EmployeesFilter
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
    ...mapState('Employees', ['employees', 'columns'])
  },
  mounted () {
  },
  methods: {
    createEmployee () {
      this.$refs.modalEmployee.openModal()
    },
    updateEmployee (row) {
      this.$refs.modalEmployee.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    viewEmployee (row) {
      this.$refs.modalEmployee.openModalView(JSON.parse(JSON.stringify(row)))
    },
    removeEmployee (row) {
      this.$setDialogQuestion({
        title: 'Excluir Funcionário',
        message: `Tem certeza que deseja excluir o funcionário ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'Employees/remove',
            params: row,
            messages: 'Funcionário excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'Employees/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
