import Vue from 'vue'
import Vuex from 'vuex'
import Employees from '../pages/employees/store'
import MedicalSchedules from '../pages/medical_schedules/store'
import Medicaments from '../pages/medicaments/store'
import Patients from '../pages/patients/store'
import Profiles from '../pages/profiles/store'
import Specialities from '../pages/specialities/store'
import TypesExams from '../pages/types_exams/store'
import Users from '../pages/users/store'
Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Employees,
      MedicalSchedules,
      Medicaments,
      Patients,
      Profiles,
      Specialities,
      TypesExams,
      Users
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
