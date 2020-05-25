<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 400px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Medicamento" }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row items-center">
        <div class="col-12">
          Nome Genérico*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.name.$error"
            v-model="form.name"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome Genérico é obrigatório"
            @input="$v.form.name.$touch"
          ></q-input>
        </div>
        <div class="col-12">
          Nome de Fábrica*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.factory.$error"
            v-model="form.factory"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Nome de Fábrica é obrigatório"
            @input="$v.form.factory.$touch"
          ></q-input>
        </div>
        <div class="col-12">
          Fabricante*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.manufacturer.$error"
            v-model="form.manufacturer"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Fabricante é obrigatório"
            @input="$v.form.manufacturer.$touch"
          ></q-input>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions class="row">
        <div class="col-12 text-right">
          <q-btn dense size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
          <q-btn v-if="!isView" dense size="sm" icon-right="save" label="Salvar" @click="save()" color="primary"></q-btn>
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
      showModal: false,
      isView: false,
      isEdit: false
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
    openModalView (form) {
      this.openModal()
      this.form = form
      this.isView = true
    },
    resetForm () {
      this.form = { ...this.formCopy }
      this.isView = false
      this.isEdit = false
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : this.isView ? 'Visualizar' : 'Cadastrar'
    },
    save () {
      this.verifiyValidations()
      const profile = {
        ...this.form
      }
      this.$createOrUpdate({
        urlDispatch: this.isEdit === true ? 'Medicaments/update' : 'Medicaments/create',
        params: profile,
        messages: this.isEdit === true ? `Medicamento ${profile.name} alterado com sucesso` : `Medicamento ${profile.name} cadastrado com sucesso`,
        callback: () => {
          this.showModal = false
          this.$list({
            urlDispatch: 'Medicaments/list'
          })
        }
      })
    }
  }
}
</script>
