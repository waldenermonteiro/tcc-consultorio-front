import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const verifyUserIsLogged = () => true
  const verifyRolesToUser = (to, next, roles) => {
    for (let index = 0; index < roles.length; index++) {
      if (to.matched.some(record => record.meta.roles === roles[index])) {
        next()
        return
      }
    }
    next('/')
  }
  const recoverRoles = () => {
    const data = JSON.parse(localStorage.getItem('data_travessia_admin'))
    const roles = data === null ? ['admin'] : data.role
    roles.push('all')
    return roles
  }
  Router.beforeEach((to, from, next) => {
    const roles = recoverRoles()
    verifyUserIsLogged() === true ? verifyRolesToUser(to, next, roles) : next()
  })

  return Router
}
