<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Funcionário" }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-6">
          Nome*:
          <q-input
            bottom-slots
            :error="$v.form.name.$error"
            v-model="form.name"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome é obrigatório"
            @input="$v.form.name.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Email*:
          <q-input
            bottom-slots
            :error="$v.form.email.$error"
            v-model="form.email"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome é obrigatório"
            @input="$v.form.email.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Perfil*:
          <q-select
            outlined
            v-model="form.profile_id"
            option-value="id"
            option-label="name"
            :options="profiles"
            dense
            emit-value
            map-options
            error-message="Perfil é obrigatório"
            :rules="[val => !!val]"
            :error="$v.form.profile_id.$error"
            @input="$v.form.profile_id.$touch"
          />
        </div>
        <div class="col-3">
          Especialidade*:
          <q-select
            outlined
            v-model="form.specialitie_id"
            option-value="id"
            option-label="name"
            :options="specialities"
            dense
            emit-value
            map-options
            error-message="Especialidade é obrigatória"
            :rules="[val => !!val]"
            :error="$v.form.specialitie_id.$error"
            @input="$v.form.specialitie_id.$touch"
          />
        </div>
        <div class="col-3" v-if="isEdit">
          <q-toggle label="Alterar Senha?" color="primary" v-model="showUpdatePassword" />
        </div>
        <div class="col-3" v-if="showUpdatePassword">
          Senha*:
          <q-input
            bottom-slots
            :error="$v.form.password.$error"
            v-model="form.password"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Senha é obrigatório"
            @input="$v.form.password.$touch"
          ></q-input>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions class="row">
        <div class="col-12 text-right">
          <q-btn dense size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
          <q-btn dense size="sm" icon-right="save" label="Salvar" @click="save()" color="primary"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import CreateValidator from './mixins/CreateValidator'
export default {
  mixins: [CreateValidator],
  data () {
    return {
      showModal: false,
      showUpdatePassword: false,
      isEdit: false
    }
  },
  computed: {
    ...mapState('Profiles', ['profiles']),
    ...mapState('Specialities', ['specialities'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Profiles/list' })
    this.$list({ urlDispatch: 'Specialities/list' })
  },
  methods: {
    openModal () {
      this.resetForm()
      this.showModal = true
      this.showUpdatePassword = true
      this.$v.form.$reset()
    },
    openModalEdit (form) {
      this.openModal()
      this.isEdit = true
      this.showUpdatePassword = false
      this.form = { ...form, email: form.user.email, profile_id: form.user.profile_id }
    },
    resetForm () {
      this.isEdit = false
      this.showUpdatePassword = false
      this.form = { ...this.formCopy }
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : 'Cadastrar'
    },
    prepareEmployee (form) {
      const employeePrepared = { ...form }
      delete form.user
      delete form.specialitie
      return employeePrepared
    },
    save () {
      this.verifiyValidations()
      const employee = this.prepareEmployee(this.form)
      this.$createOrUpdate({
        urlDispatch: this.isEdit === true ? 'Employees/update' : 'Employees/create',
        params: employee,
        messages: this.isEdit === true ? `Funcionário ${employee.name} alterado com sucesso` : `Funcionário ${employee.name} cadastrado com sucesso`,
        callback: () => {
          this.showModal = false
          this.$list({
            urlDispatch: 'Employees/list'
          })
        }
      })
    }
  }
}
</script>
