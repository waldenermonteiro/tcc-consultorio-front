import { Notify, Dialog } from 'quasar'
export default {
  methods: {
    $setNotifyDanger (message) {
      const uniqueMessage = message.message || message
      if (Array.isArray(message)) {
        this.setMultipleNotifyDanger(message)
      } else {
        this.setUniqueNotifyDanger(uniqueMessage)
      }
    },
    setUniqueNotifyDanger (message) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: message,
        icon: 'report_problem'
      })
    },
    setMultipleNotifyDanger (messages) {
      messages.forEach(object => {
        this.setUniqueNotifyDanger(object.message)
      })
    },
    $setNotifySuccess (message) {
      Notify.create({
        color: 'positive',
        position: 'top',
        message: message,
        icon: 'check_circle'
      })
    },

    $setNotifyInfo (message) {
      Notify.create({
        color: 'primary',
        position: 'top',
        message: message,
        icon: 'info'
      })
    },
    $setNotifyWarning (message) {
      Notify.create({
        color: 'warning',
        position: 'top',
        message: message,
        icon: 'warning'
      })
    },
    $setDialogQuestion (obj) {
      Dialog.create({
        title: `${obj.title}`,
        message: `${obj.message}`,
        cancel: { label: 'Cancelar', color: 'negative', icon: 'cancel', size: 'sm' },
        ok: { label: 'Sim', class: 'text-white bg-blue-gold', iconRight: 'save', size: 'sm' }
      }).onOk(() => {
        obj.callback()
      })
    }
  }
}
