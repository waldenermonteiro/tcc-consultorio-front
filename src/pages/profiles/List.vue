<template>
  <q-page>
    <div class="q-pa-md">
      <q-table dense title="Treats" :data="profiles" :columns="columns" row-key="id" :filter="filter" separator="cell" :pagination.sync="pagination" table-style="material striped">
        <template v-slot:top>
          <q-input outlined dense label="Pesquisar" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn dense size="sm" icon="add" color="primary" label="Novo Perfil" @click="createProfile()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold text-dark bg-grey-3">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" :props="props">
            <q-btn size="xs" dense color="secondary" title="editar" icon="edit" class="q-mr-sm" @click="updateProfile(props.row)"></q-btn>
            <q-btn size="xs" dense color="negative" title="excluir" icon="delete" @click="removeProfile(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <profiles-create ref="modalProfile"></profiles-create>
    </div>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import Create from './Create.vue'
export default {
  components: {
    'profiles-create': Create
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
    ...mapState('Profiles', ['profiles', 'columns'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Profiles/list' })
  },
  methods: {
    createProfile () {
      this.$refs.modalProfile.openModal()
    },
    updateProfile (row) {
      this.$refs.modalProfile.openModalEdit(JSON.parse(JSON.stringify(row)))
    },
    removeProfile (row) {
      this.$setDialogQuestion({
        title: 'Excluir Perfil',
        message: `Tem certeza que deseja excluir o perfil ${row.name} ?`,
        callback: () => {
          this.$remove({
            urlDispatch: 'Profiles/remove',
            params: row,
            messages: 'Perfil excluído com sucesso',
            callback: () => {
              this.$list({
                urlDispatch: 'Profiles/list'
              })
            }
          })
        }
      })
    }
  }
}
</script>
