<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 1000px; max-width: 100vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h5 text-center q-ml-xl">Emitir Resultado do Exame: {{ exam.typeExam.name }} </q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <div class="text-h6 text-center">Data da requisição: {{ exam.created_at }}</div>
      <q-card-section class="row">
        <div class="col-12">
          <p class="text-subtitle1 q-mb-auto"><b>Médico: </b>{{ exam.medicalSchedule.employee.name }}</p>
          <p class="text-subtitle1"><b>Paciente: </b>{{ exam.medicalSchedule.patient.name }}</p>
          <p class="text-subtitle1"><b>Observação: </b>{{ exam.observation }}</p>
        </div>
        <div class="col-12">
          Resultado do Exame*:
          <q-input :error="$v.form.observation.$error" error-message="Observação é obrigatório" v-model="form.observation" type="textarea" outlined autogrow></q-input>
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
import CreateRequestExamValidation from '../mixins/CreateRequestExamValidation.mixin'
export default {
  mixins: [CreateRequestExamValidation],
  data () {
    return {
      showModal: false,
      exam: {},
      formFilter: {
        status: ''
      }
    }
  },
  methods: {
    openModal (row) {
      this.showModal = true
      this.exam = { ...row }
    },
    setForm (form) {
      this.formFilter = { ...form }
    },
    prepareResultExam (form) {
      this.verifyValidations()
      const resultExamPrepared = { result: { observation: this.form.observation }, request_exam_id: this.exam.id, medical_schedule_id: this.exam.medical_schedule_id }
      return resultExamPrepared
    },
    save () {
      const resultExam = this.prepareResultExam(this.form)
      this.$setDialogQuestion({
        title: 'Concluir Emissão de Resultado de Exame',
        message: 'Tem certeza que deseja concluir a emissão ?',
        callback: () => {
          this.$createOrUpdate({
            urlDispatch: 'ResultExams/create',
            params: resultExam,
            messages: 'Resultado de exame emitido com sucesso',
            callback: () => {
              this.showModal = false
              this.$list({ urlDispatch: 'RequestExams/list', params: this.formFilter })
            }
          })
        }
      })
    }
  }
}
</script>
