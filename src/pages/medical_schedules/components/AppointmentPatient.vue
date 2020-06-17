<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 1200px; max-width: 100vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h5 text-center q-ml-xl q-pa-md">Consulta Paciente: {{ medicalSchedule.patient.name }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <div class="text-h6 text-center">Hora marcada: {{ $formatHourBr(medicalSchedule.date_appointment) }}</div>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-12 text-right"><q-btn size="sm" icon="history" label="Histórico do paciente" @click="historyPatient(medicalSchedule)" color="info"></q-btn></div>
        <div class="col-12">
          Observações da Consulta:
          <q-input v-model="form.medicalSchedule.observation" outlined type="textarea" autogrow />
        </div>
        <div class="col-12">
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
            <q-tab name="receit" label="Gerar Receita" />
            <q-tab name="exams" label="Solicitar Exame(s)" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="receit">
              <div class="col-12 row">
                <q-list bordered class="rounded-borders col-12 q-pa-sm" style="max-width: 1200px">
                  <div class="row q-mb-sm q-col-gutter-md">
                    <div class="col-4"><b>Medicamentos</b></div>
                    <div class="col-2"><b>Quantidade</b></div>
                    <div class="col-5"><b>Dosagem</b></div>
                    <div class="col-1 text-right">
                      <q-btn class="gt-xs" size="14px" flat dense round color="primary" icon="add" @click="addMedicament()"></q-btn>
                    </div>
                  </div>
                  <q-item class="no-padding" v-for="(v, index) in $v.form.medicalSchedule.prescription_medicaments.medicaments.$each.$iter" :key="index">
                    <q-item-section class="col-4">
                      <q-item-label>
                        <q-select
                          outlined
                          :options="optionsMedicaments"
                          option-value="name"
                          option-label="name"
                          v-model.trim="v.name.$model"
                          dense
                          use-input
                          emit-value
                          map-options
                          @filter="filterMedicament"
                          :error="v.name.$error"
                          error-message="Nome do medicamento é obrigatório"
                        >
                        </q-select>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-2">
                      <q-item-label>
                        <q-input :error="v.qtd.$error" error-message="Quantidade é obrigatória" v-model="v.qtd.$model" dense outlined type="text" autogrow
                      /></q-item-label>
                    </q-item-section>
                    <q-item-section class="col-5">
                      <q-item-label>
                        <q-input :error="v.dosage.$error" error-message="Dosagem é obrigatória" v-model="v.dosage.$model" dense outlined type="text" autogrow
                      /></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class=""><q-btn class="gt-xs" size="12px" flat dense round color="negative" icon="delete" @click="removeMedicament(index)" /></div>
                    </q-item-section>
                  </q-item>
                </q-list></div
            ></q-tab-panel>
            <q-tab-panel name="exams">
              <div class="col-12 row">
                <q-list bordered class="rounded-borders col-12 q-pa-sm" style="max-width: 1200px">
                  <div class="row q-pb-sm q-col-gutter-md">
                    <div class="col-6"><b>Exame</b></div>
                    <div class="col-4"><b>Observação</b></div>
                    <div class="col-2 text-right">
                      <q-btn class="gt-xs" size="14px" flat dense round color="primary" icon="add" @click="addExam()"></q-btn>
                    </div>
                  </div>
                  <q-item class="no-padding" v-for="(v, index) in $v.formRequestExam.requestExam.$each.$iter" :key="index">
                    <q-item-section top class="col-6 gt-sm">
                      <q-item-label class="q-mt-sm">
                        <q-select
                          outlined
                          :options="optionsTypesExams"
                          option-value="id"
                          option-label="name"
                          v-model.trim="v.type_exam_id.$model"
                          dense
                          use-input
                          emit-value
                          map-options
                          @filter="filterTypeExam"
                          :error="v.type_exam_id.$error"
                          error-message="Tipo de exame é obrigatório"
                        >
                        </q-select
                      ></q-item-label>
                    </q-item-section>
                    <q-item-section top>
                      <q-item-label class="q-mt-sm">
                        <q-input :error="v.observation.$error" error-message="Observação é obrigatório" v-model="v.observation.$model" dense outlined type="text" autogrow
                      /></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class=""><q-btn class="gt-xs" size="12px" flat dense round color="negative" icon="delete" @click="removeExam(index)" /></div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
      <q-card-actions class="row">
        <div class="col-8 text-subtitle2">
          <q-icon size="md" name="access_time"></q-icon>Tempo da consulta: {{ `${hour}${minute}${second}` }}
          <q-btn size="sm" label="Parar" icon="stop" @click="stopConsult()" color="negative"></q-btn>
        </div>
        <div class="col-4 text-right">
          <q-btn size="sm" icon="check" label="Finalizar Consulta" @click="save()" color="primary"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
    <patients-history ref="modalHistoryPatient"></patients-history>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import CreateConsultValidor from '../mixins/CreateConsultValidator'
import History from '../../patients/components/History'
export default {
  components: {
    'patients-history': History
  },
  mixins: [CreateConsultValidor],
  data () {
    return {
      time: 0,
      hour: '',
      minute: '',
      second: '',
      listFilter: '',
      tab: 'receit'
    }
  },
  computed: {
    ...mapState('Employees', ['employees']),
    ...mapState('TypesExams', ['typesExams']),
    ...mapState('Medicaments', ['medicaments'])
  },
  mounted () {
    this.$list({ urlDispatch: 'Medicaments/list' })
    this.$list({ urlDispatch: 'TypesExams/list' })
  },
  methods: {
    openModal (medicalSchedule, listFilter) {
      this.medicalSchedule = { ...medicalSchedule }
      // this.startConsult()
      this.showModal = true
      this.listFilter = listFilter
      this.resetForm()
    },
    closeModal () {
      this.showModal = false
      this.$v.form.medicalSchedule.prescription_medicaments.medicaments.$reset()
      this.$v.formRequestExam.requestExam.$reset()
    },
    resetForm () {
      this.form = { medicalSchedule: { observation: '', prescription_medicaments: { medicaments: [] } } }
      this.formRequestExam.requestExam = []
      this.tab = 'receit'
    },
    historyPatient (medicalSchedule) {
      this.$refs.modalHistoryPatient.openModal({ ...medicalSchedule, hasDiferent: true })
    },
    startConsult () {
      let s = 1
      let m = 0
      let h = 0
      const self = this
      self.time = setInterval(function () {
        if (s === 60) {
          m++
          s = 0
        }
        if (m === 60) {
          h++
          s = 0
          m = 0
        }
        if (h < 10) self.hour = '0' + h + ':'
        else self.hour = h + ':'
        if (s < 10) self.second = '0' + s + ''
        else self.second = s
        if (m < 10) self.minute = '0' + m + ':'
        else self.minute = m + ':'
        s++
      }, 1000)
    },
    stopConsult () {
      clearInterval(this.time)
    },
    filterMedicament (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsMedicaments = this.medicaments.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterTypeExam (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsTypesExams = this.typesExams.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    addMedicament () {
      this.form.medicalSchedule.prescription_medicaments.medicaments.push({ name: '', qtd: '', dosage: '' })
    },
    removeMedicament (index) {
      this.form.medicalSchedule.prescription_medicaments.medicaments.splice(index, 1)
    },
    addExam () {
      this.formRequestExam.requestExam.push({ type_exam_id: '', observation: '' })
    },
    removeExam (index) {
      this.formRequestExam.requestExam.splice(index, 1)
    },
    verifyParams () {
      this.verifiyValidations()
      const finishConsult = {
        id: this.medicalSchedule.id,
        medicalSchedule: { ...this.form.medicalSchedule },
        requestExam: JSON.parse(JSON.stringify(this.formRequestExam.requestExam))
      }
      if (this.form.medicalSchedule.prescription_medicaments.medicaments.length === 0) {
        finishConsult.medicalSchedule.prescription_medicaments = {}
      }
      if (this.formRequestExam.requestExam.length === 0) {
        delete finishConsult.requestExam
      }
      return finishConsult
    },
    save () {
      const params = this.verifyParams()
      this.$setDialogQuestion({
        title: 'Concluir Consulta',
        message: 'Tem certeza que deseja concluir a consulta ?',
        callback: () => {
          this.$createOrUpdate({
            urlDispatch: 'MedicalSchedules/finishConsult',
            params,
            messages: 'Consulta finalizada  com sucesso',
            callback: () => {
              this.closeModal()
              this.listFilter()
            }
          })
        }
      })
    }
  }
}
</script>
