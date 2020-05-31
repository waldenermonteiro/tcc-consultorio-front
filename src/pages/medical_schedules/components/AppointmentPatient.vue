<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="width: 1200px; max-width: 100vw;">
      <q-toolbar class="bg-toolbar-custom">
        <q-toolbar-title class="text-h5 text-center q-ml-xl">Consulta Paciente: {{ this.medicalSchedule.patient.name }}</q-toolbar-title>
        <q-btn flat round icon="close" size="sm" @click="showModal = false"></q-btn>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-12 text-h6 text-center">Hora marcada: {{ $formatHourBr(this.medicalSchedule.date_appointment) }}</div>
        <div class="col-12">
          Observações da Consulta:
          <q-input v-model="obConsult" outlined type="textarea" autogrow />
        </div>
        <div class="col-6">
          <q-toggle v-model="isReceit" label="Emitir Receita? " />
          <div v-if="isReceit">Observações da Receita:<q-input v-model="obReceit" outlined type="textarea" autogrow /></div>
          <div v-if="isReceit" class="col-12 row">
            <q-list bordered class="rounded-borders col-12 q-pa-sm" style="max-width: 1200px">
              <div class="row q-mb-sm q-col-gutter-md">
                <div class="col-6"><b>Medicamentos</b></div>
                <div class="col-4"><b>Dosagem</b></div>
                <div class="col-2 text-right">
                  <q-btn class="gt-xs" size="14px" flat dense round color="primary" icon="add" @click="addMedicament()"></q-btn>
                </div>
              </div>
              <q-item class="no-padding" v-for="(item, index) in items" :key="index">
                <q-item-section top class="col-6 gt-sm">
                  <q-item-label class="q-mt-sm">
                    <q-select
                      outlined
                      :options="optionsMedicaments"
                      option-value="id"
                      option-label="name"
                      v-model="item.name"
                      dense
                      use-input
                      emit-value
                      map-options
                      @filter="filterMedicament"
                    >
                    </q-select>
                  </q-item-label>
                </q-item-section>
                <q-item-section top>
                  <q-item-label class="q-mt-sm"> <q-input v-model="item.dosagem" dense outlined type="text" autogrow/></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class=""><q-btn class="gt-xs" size="12px" flat dense round color="negative" icon="delete" @click="removeMedicament(item, index)" /></div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="col-6">
          <q-toggle v-model="isExam" label="Solicitar Exame? " />
          <div v-if="isExam">Observações do Exame:<q-input v-model="obExam" outlined type="textarea" autogrow /></div>
          <div v-if="isExam" class="col-12 row">
            <q-list bordered class="rounded-borders col-12 q-pa-sm" style="max-width: 1200px">
              <div class="row q-pb-sm q-col-gutter-md">
                <div class="col-6"><b>Exame</b></div>
                <div class="col-6 text-right">
                  <q-btn class="gt-xs" size="14px" flat dense round color="primary" icon="add" @click="addExam()"></q-btn>
                </div>
              </div>
              <q-item class="no-padding" v-for="(exam, index) in exams" :key="index">
                <q-item-section top class="col-6 gt-sm">
                  <q-item-label class="q-mt-sm">
                    <q-select
                      outlined
                      :options="optionsTypesExams"
                      option-value="id"
                      option-label="name"
                      v-model="exam.name"
                      dense
                      use-input
                      emit-value
                      map-options
                      @filter="filterTypeExam"
                    >
                    </q-select
                  ></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class=""><q-btn class="gt-xs" size="12px" flat dense round color="negative" icon="delete" @click="removeExam(exam, index)" /></div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row">
        <div class="col-8 text-subtitle2">
          <q-icon size="md" name="access_time"></q-icon>Tempo da consulta: {{ `${hour}${minute}${second}` }}
          <q-btn dense size="sm" label="Parar" icon-right="stop" @click="save()" color="negative"></q-btn>
        </div>
        <div class="col-4 text-right">
          <q-btn size="sm" icon-right="check" label="Finalizar Consulta" @click="save()" color="primary"></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      obConsult: '',
      obReceit: '',
      obExam: '',
      optionsMedicaments: this.medicaments,
      optionsTypesExams: this.typesExams,
      showModal: false,
      isReceit: false,
      isExam: false,
      medicalSchedule: { date_appointment: '', patient: { name: '' } },
      time: 0,
      hour: '',
      minute: '',
      second: '',
      items: [{ medicamento: '', dosagem: '' }],
      exams: [{ name: '' }]
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
    openModal (medicalSchedule) {
      this.medicalSchedule = { ...medicalSchedule }
      this.startConsult()
      this.showModal = true
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
      this.items.push({ medicamento: '', dosagem: '' })
    },
    removeMedicament (item, index) {
      this.items.splice(index, 1)
    },
    addExam () {
      this.exams.push({ name: '' })
    },
    removeExam (item, index) {
      this.exams.splice(index, 1)
    }
  }
}
</script>
