<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="specialities"
        :columns="columns"
        row-key="id"
        :filter="filter"
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
          <q-btn size="sm" icon="add" color="primary" label="Nova Especialidade" @click="createSpecialitie()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn size="sm" dense color="positive" :title="'Visualizar especialidade ' + props.row.name" icon="search" class="q-mr-sm" @click="viewSpecialitie(props.row)"></q-btn>
            <q-btn size="sm" dense color="secondary" :title="'Editar especialidade ' + props.row.name" icon="edit" class="q-mr-sm" @click="updateSpecialitie(props.row)"></q-btn>
            <q-btn size="sm" dense color="negative" :title="'Excluir especialidade ' + props.row.name" icon="delete" @click="removeSpecialitie(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <specialities-create ref="modalSpecialitie"></specialities-create>
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
    ...mapState('Specialities', ['specialities', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Specialities/list' })
  },
  methods: {
    createSpecialitie () {
      this.$refs.modalSpecialitie.openModal()
    },
    updateSpecialitie (row) {
      this.$refs.modalSpecialitie.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    viewSpecialitie (row) {
      this.$refs.modalSpecialitie.openModalView(JSON.parse(JSON.stringify(row)))
    },
    removeSpecialitie (row) {
      this.$setDialogQuestion({
        title: 'Excluir Especialidade',
        message: `Tem certeza que deseja excluir a especialidade ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'Specialities/remove',
            params: row,
            messages: 'Especialidade excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'Specialities/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
