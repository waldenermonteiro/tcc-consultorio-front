<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 500px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">Alterar Senha</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-6">
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
            error-message="Senha é obrigatória"
            @input="$v.form.password.$touch"
          ></q-input>
        </div>
        <div class="col-6">
          Repetir Senha*:
          <q-input
            bottom-slots
            :error="$v.form.repetPassword.$error"
            v-model="form.repetPassword"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="As senhas não são iguais"
            @input="$v.form.repetPassword.$touch"
          ></q-input>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions class="row">
        <div class="col-12 text-right">
          <q-btn size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
          <q-btn size="sm" icon-right="save" label="Salvar" @click="save()" color="primary"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import CreateValidator from '../mixins/CreateValidator'
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
    resetForm () {
      this.form = { ...this.formCopy }
    },
    save () {
      this.verifiyValidations()
      const profile = {
        ...this.form
      }
      this.$createOrUpdate({
        urlDispatch: 'Users/updatePassword',
        params: profile,
        messages: 'Alteração da senha realizada com sucesso'
      })
    }
  }
}
</script>
