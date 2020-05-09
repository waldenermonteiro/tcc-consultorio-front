import NotifyMessage from '../mixins/notify-message.mixin.js'
export default ({ Vue, store }) => {
  Vue.mixin({
    mixins: [NotifyMessage],
    methods: {
      async skeleton (params) {
        if (!params.noLoading) Vue.prototype.$q.loading.show()
        try {
          await store.dispatch(params.urlDispatch, params.params)
          if (params.messages) this.$setNotifySuccess(params.messages)
          if (params.callback) params.callback()
        } catch (errors) {
          this.$setNotifyDanger(errors)
        } finally { Vue.prototype.$q.loading.hide() }
      },
      async $list (params) {
        await this.skeleton(params)
      },
      async $listFilter (params) {
        await this.skeleton(params)
      },
      async $createOrUpdate (params) {
        await this.skeleton(params)
      },
      async $remove (params) {
        await this.skeleton(params)
      }
    }

  })
}
