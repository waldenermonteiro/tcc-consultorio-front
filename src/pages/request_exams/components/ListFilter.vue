<template>
  <div class="q-pa-sm">
    <div class="row justify-center q-col-gutter-sm ">
      <div class="col-3">
        Data:
        <q-input outlined v-model="formFilter.created_at" dense @click="$refs.qDateAppointment.show()">
          <template v-slot:append>
            <q-icon v-if="formFilter.created_at" name="cancel" @click="clearInput('created_at')" class="cursor-pointer" />
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateAppointment" transition-show="scale" transition-hide="scale">
                <q-date color="primary" v-model="formFilter.created_at" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-3">
        Tipos de Exames:
        <q-select outlined v-model="formFilter.type_exam_id" option-value="id" option-label="name" :options="typesExams" dense emit-value map-options>
          <template v-if="formFilter.type_exam_id" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('type_exam_id')" class="cursor-pointer" />
          </template>
        </q-select>
      </div>
      <div class="col-3">
        Status:
        <q-select option-value="value" option-label="label" emit-value map-options outlined :options="optionsStatus" v-model="formFilter.status" dense>
          <template v-if="formFilter.status" v-slot:append>
            <q-icon name="cancel" @click.stop="clearInput('status')" class="cursor-pointer" />
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
        created_at: '',
        status: '',
        type_exam_id: ''
      },
      formFilterCopy: { ...this.formFilter }
    }
  },
  computed: {
    ...mapState('RequestExams', ['optionsStatus']),
    ...mapState('TypesExams', ['typesExams'])
  },
  mounted () {
    this.$list({ urlDispatch: 'TypesExams/list' })
  },
  methods: {
    setForm (form) {
      this.formFilter = { ...form }
      this.$list({ urlDispatch: 'RequestExams/list', params: this.formFilter })
    },
    prepareParams (form) {
      const formCustom = { ...form }
      formCustom.created_at = this.$formatDateAndHourApi(this.$formatDateBrInApi(this.formFilter.created_at))
      console.log(formCustom.created_at)
      return formCustom
    },
    send () {
      const params = this.prepareParams(this.formFilter)
      this.$list({ urlDispatch: 'RequestExams/list', params })
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
