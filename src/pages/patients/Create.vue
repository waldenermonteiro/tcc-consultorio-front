<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Paciente" }}</q-toolbar-title>
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
          Data de Nascimento*:
          <q-input outlined v-model="form.birth_date" dense @click="$refs.qDateProxy.show()" :error="$v.form.birth_date.$error" error-message="Data é obrigatória">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date color="primary" v-model="form.birth_date" :options="optionsFn" @input="() => $refs.qDateProxy.hide()" mask="DD/MM/YYYY" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-3">
          RG*:
          <q-input
            bottom-slots
            :error="$v.form.rg.$error"
            v-model="form.rg"
            maxlength="7"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="RG é obrigatório"
            @input="$v.form.rg.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          CPF*:
          <q-input
            v-mask="['###.###.###-##']"
            bottom-slots
            :error="$v.form.cpf.$error"
            v-model="form.cpf"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="CPF é obrigatório"
            @input="$v.form.rg.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Cidade*:
          <q-input
            bottom-slots
            :error="$v.form.city.$error"
            v-model="form.city"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Cidade é obrigatório"
            @input="$v.form.city.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Estado*:
          <q-select
            outlined
            v-model="form.state"
            :options="optionsUfs"
            dense
            emit-value
            map-options
            error-message="Estado é obrigatória"
            :rules="[val => !!val]"
            :error="$v.form.state.$error"
            @input="$v.form.state.$touch"
          />
        </div>
        <div class="col-3">
          Sexo*:
          <q-input
            bottom-slots
            :error="$v.form.sex.$error"
            v-model="form.sex"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Sexo é obrigatório"
            @input="$v.form.sex.$touch"
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
        <div class="col-3" v-if="!isEdit">
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
import { date } from 'quasar'
import CreateValidator from './mixins/CreateValidator'
export default {
  mixins: [CreateValidator],
  data () {
    return {
      showModal: false,
      showUpdatePassword: false,
      isEdit: false,
      medicalSchedule: {},
      executeFunctionCallback: ''
    }
  },
  computed: {
    ...mapState('Patients', ['resultCreate', 'optionsUfs'])
  },
  methods: {
    optionsFn (data) {
      return data <= date.formatDate(new Date(), 'YYYY/MM/DD')
    },
    openModal () {
      // this.resetForm()
      this.showModal = true
      this.form.birth_date = this.$formatDateBr('2020-05-01')
      this.$v.form.$reset()
    },
    openModalEdit (form) {
      this.openModal()
      this.isEdit = true
      this.form = { ...form, email: form.user.email, birth_date: this.$formatDateBr(form.birth_date) }
      delete this.form.password
    },
    setFunctionCallback (func = function () {}) {
      this.executeFunctionCallback = func
    },
    resetForm () {
      this.isEdit = false
      this.$store.state.Patients.resultCreate = ''
      this.form = { ...this.formCopy }
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : 'Cadastrar'
    },
    preparePatient (form) {
      const patientPrepared = {
        ...form,
        cpf: this.$formatReplaceCpfCnpj(form.cpf),
        birth_date: this.$formatDateBrInApi(form.birth_date)
      }
      delete form.user
      return patientPrepared
    },
    save (row) {
      this.verifiyValidations()
      const patient = this.preparePatient(this.form)
      this.$createOrUpdate({
        urlDispatch: this.isEdit === true ? 'Patients/update' : 'Patients/create',
        params: patient,
        messages: this.isEdit === true ? `Paciente ${patient.name} alterado com sucesso` : `Paciente ${patient.name} cadastrado com sucesso`,
        callback: row => {
          this.showModal = false
          this.$list({
            urlDispatch: 'Patients/list'
          })
          this.executeFunctionCallback()
        }
      })
    }
  }
}
</script>
