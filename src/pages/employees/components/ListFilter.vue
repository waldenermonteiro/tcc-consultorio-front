<template>
  <div class="q-pa-sm">
    <div class="row justify-center q-col-gutter-sm ">
      <div class="col-3">
        Funcionário:
        <q-select
          outlined
          :options="optionsEmployees"
          option-value="id"
          option-label="name"
          v-model="formFilter.id"
          dense
          use-input
          emit-value
          map-options
          @filter="filterEmployee"
          hint="Digite para pesquisar um funcionário"
        >
          <template v-if="formFilter.id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-3">
        Especialidades:
        <q-select outlined v-model="formFilter.specialitie_id" option-value="id" option-label="name" :options="specialities" dense emit-value map-options>
          <template v-if="formFilter.specialitie_id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('specialitie_id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-3">
        Perfis:
        <q-select outlined v-model="formFilter.profile_id" option-value="id" option-label="name" :options="profiles" dense emit-value map-options>
          <template v-if="formFilter.profile_id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('profile_id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-7">
        <div class="row justify-center q-col-gutter-sm">
          <div class="col-3">
            <q-btn size="sm" class="full-width" label="Limpar" color="grey" icon="delete" @click="clearForm()"></q-btn>
          </div>
          <div class="col-3">
            <q-btn size="sm" class="full-width" label="Buscar" color="primary" icon="search" @click="send()"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formFilter: {
        id: '',
        specialitie_id: '',
        profile_id: ''
      },
      optionsEmployees: this.employees,
      formFilterCopy: { ...this.formFilter }
    }
  },
  computed: {
    ...mapState('Specialities', ['specialities']),
    ...mapState('Profiles', ['profiles']),
    ...mapState('Employees', ['employees'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Specialities/list' })
    this.$list({ urlDispatch: 'Profiles/list' })
  },
  methods: {
    filterEmployee (val, update, abort) {
      update(() => {
        if (val.length < 2) {
          abort()
          return ''
        } else {
          const needle = val.toLowerCase()
          this.optionsEmployees = this.employees.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    send () {
      this.$list({ urlDispatch: 'Employees/list', params: this.formFilter })
    },
    clearForm () {
      this.formFilter = { ...this.formFilterCopy }
      this.send()
    },
    clearInput (prop) {
      this.formFilter[prop] = ''
      this.send()
    }
  }
}
</script>
