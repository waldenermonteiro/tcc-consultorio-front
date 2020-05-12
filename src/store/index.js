import Vue from 'vue'
import Vuex from 'vuex'
import Employees from '../pages/employees/store'
import Medicaments from '../pages/medicaments/store'
import Profiles from '../pages/profiles/store'
import Specialities from '../pages/specialities/store'
import TypesExams from '../pages/types_exams/store'
Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Employees,
      Medicaments,
      Profiles,
      Specialities,
      TypesExams
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
