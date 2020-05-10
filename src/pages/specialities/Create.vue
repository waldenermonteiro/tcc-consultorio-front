<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 500px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Especialidade" }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row items-center">
        <div class="col-12">
          Nome*:
          <q-input
            bottom-slots
            :error="$v.form.name.$error"
            v-model="form.name"
            maxlength="100"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome é obrigatório"
            @input="$v.form.name.$touch"
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
import CreateValidator from './mixins/CreateValidator'
export default {
  mixins: [CreateValidator],
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    openModal () {
      this.resetForm()
      this.showModal = true
      this.$v.form.$reset()
    },
    openModalEdit (form) {
      this.openModal()
      this.isEdit = true
      this.form = form
    },
    resetForm () {
      this.form = { ...this.formCopy }
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : 'Cadastrar'
    },
    save () {
      this.verifiyValidations()
      const profile = {
        ...this.form
      }
      this.$createOrUpdate({
        urlDispatch: this.isEdit === true ? 'Specialities/update' : 'Specialities/create',
        params: profile,
        messages: this.isEdit === true ? `Especialidade ${profile.name} alterada com sucesso` : `Especialidade ${profile.name} cadastrada com sucesso`,
        callback: () => {
          this.showModal = false
          this.$list({
            urlDispatch: 'Specialities/list'
          })
        }
      })
    }
  }
}
</script>
