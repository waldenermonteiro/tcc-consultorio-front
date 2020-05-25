<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        dense
        title="Treats"
        :data="medicaments"
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
          <q-btn dense size="sm" icon="add" color="primary" label="Novo medicamento" @click="createMedicament()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn size="xs" dense color="positive" :title="'Visualizar perfil ' + props.row.name" icon="search" class="q-mr-sm" @click="viewMedicament(props.row)"></q-btn>
            <q-btn size="xs" dense color="secondary" :title="'Editar medicamento ' + props.row.name" icon="edit" class="q-mr-sm" @click="updateMedicament(props.row)"></q-btn>
            <q-btn size="xs" dense color="negative" :title="'Excluir medicamento ' + props.row.name" icon="delete" @click="removeMedicament(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <medicaments-create ref="modalMedicament"></medicaments-create>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
export default {
  components: {
    'medicaments-create': Create
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
    ...mapState('Medicaments', ['medicaments', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Medicaments/list' })
  },
  methods: {
    createMedicament () {
      this.$refs.modalMedicament.openModal()
    },
    updateMedicament (row) {
      this.$refs.modalMedicament.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    viewMedicament (row) {
      this.$refs.modalMedicament.openModalView(JSON.parse(JSON.stringify(row)))
    },
    removeMedicament (row) {
      this.$setDialogQuestion({
        title: 'Excluir Medicamento',
        message: `Tem certeza que deseja excluir o medicamento ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'Medicaments/remove',
            params: row,
            messages: 'Medicamento excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'Medicaments/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
