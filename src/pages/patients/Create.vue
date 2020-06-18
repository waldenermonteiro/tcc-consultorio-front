<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 900px; max-width: 80vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h6 text-center q-ml-xl">{{ verifyTypeAction() + " Paciente" }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-6">
          Nome*:
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
            error-message="Nome é obrigatório"
            @input="$v.form.name.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Data de Nascimento*:
          <q-input
            :readonly="isView"
            outlined
            v-model="form.birth_date"
            dense
            @click="$refs.qDateProxy.show()"
            :error="$v.form.birth_date.$error"
            error-message="Data é obrigatória"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" v-if="!isView">
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
            :readonly="isView"
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
            :readonly="isView"
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
          CEP*:
          <q-input
            :readonly="isView"
            v-mask="['#####-###']"
            bottom-slots
            :error="$v.form.cep.$error"
            v-model="form.cep"
            maxlength="9"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Cep é obrigatório"
            @keyup.enter="searchCep(form.cep)"
            @input="$v.form.cep.$touch"
          ></q-input>
        </div>
        <div class="col-6">
          Endereço*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.address.$error"
            v-model="form.address"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Endereço é obrigatório"
            @input="$v.form.address.$touch"
          ></q-input>
        </div>
        <div class="col-4">
          Complemento*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.complement.$error"
            v-model="form.complement"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Complemento é obrigatório"
            @input="$v.form.complement.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Bairro*:
          <q-input
            :readonly="isView"
            bottom-slots
            :error="$v.form.district.$error"
            v-model="form.district"
            maxlength="30"
            outlined
            dense
            debounce="300"
            color="primary"
            error-message="Bairro é obrigatório"
            @input="$v.form.district.$touch"
          ></q-input>
        </div>
        <div class="col-3">
          Cidade*:
          <q-input
            :readonly="isView"
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
        <div class="col-2">
          Estado*:
          <q-select
            :readonly="isView"
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
        <div class="col-2">
          Sexo*:
          <q-input
            :readonly="isView"
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
        <div class="col-4">
          Email*:
          <q-input
            :readonly="isView"
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
        <div class="col-3" v-if="!isEdit && !isView">
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
          <q-btn size="sm" icon="cancel" label="Cancelar" class="q-mr-sm" color="negative" @click="showModal = false"></q-btn>
          <q-btn v-if="!isView" size="sm" icon="save" label="Salvar" @click="save()" color="primary"></q-btn>
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
      isView: false,
      medicalSchedule: {},
      executeFunctionCallback: ''
    }
  },
  computed: {
    ...mapState('Patients', ['resultCreate', 'optionsUfs', 'cepInformations'])
  },
  methods: {
    optionsFn (data) {
      return data <= date.formatDate(new Date(), 'YYYY/MM/DD')
    },
    openModal () {
      this.resetForm()
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
    openModalView (form) {
      this.openModal()
      this.form = { ...form, email: form.user.email, birth_date: this.$formatDateBr(form.birth_date) }
      this.isView = true
    },
    searchCep (cep) {
      const cepFormated = this.$formatReplaceCep(cep)
      this.$list({
        urlDispatch: 'Patients/searchCep',
        params: cepFormated,
        callback: () => {
          this.form = {
            ...this.form,
            address: this.cepInformations.logradouro,
            district: this.cepInformations.bairro,
            city: this.cepInformations.localidade,
            state: this.cepInformations.uf
          }
        }
      })
    },
    resetForm () {
      this.$store.state.Patients.resultCreate = ''
      this.form = { ...this.formCopy }
      this.isEdit = false
      this.isView = false
    },
    verifyTypeAction () {
      return this.isEdit ? 'Editar' : this.isView ? 'Visualizar' : 'Cadastrar'
    },
    setFunctionCallback (func = function () {}) {
      this.executeFunctionCallback = func
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
