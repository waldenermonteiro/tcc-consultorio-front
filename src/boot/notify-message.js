import NotifyMessage from '../mixins/notify-message.mixin.js'
export default ({ Vue }) => {
  Vue.mixin({
    mixins: [NotifyMessage]
  })
}
