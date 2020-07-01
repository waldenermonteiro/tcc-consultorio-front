const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    meta: { roles: ['login'] },
    children: [{ path: '', name: 'login', component: () => import('src/pages/users/Login.vue'), meta: { roles: ['login'] } }]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('pages/Index.vue'),
        meta: { roles: ['recepcionista', 'biomedico', 'medico', 'paciente', 'administrador'], acess: true, name: 'Dashboard', icons: 'home' }
      },
      {
        path: '/consultas',
        name: 'Consultas',
        component: () => import('pages/medical_schedules/List.vue'),
        meta: { roles: ['administrador', 'recepcionista'], name: 'Consultas', icons: 'fas fa-book-medical' }
      },
      {
        path: '/consultas-medico',
        name: 'Consultas de Hoje',
        component: () => import('pages/medical_schedules/ListOfMedic.vue'),
        meta: { roles: ['administrador', 'medico'], name: 'Consultas', icons: 'fas fa-comment-medical' }
      },
      {
        path: '/funcionarios',
        name: 'Funcionários',
        component: () => import('pages/employees/List.vue'),
        meta: { roles: ['administrador'], name: 'Funcionários', icons: 'fas fa-hospital-user' }
      },
      {
        path: '/medicamentos',
        name: 'Medicamentos',
        component: () => import('pages/medicaments/List.vue'),
        meta: { roles: ['administrador'], name: 'Medicamentos', icons: 'fas fa-pills' }
      },
      {
        path: '/perfis',
        name: 'Perfis',
        component: () => import('pages/profiles/List.vue'),
        meta: { roles: ['administrador'], name: 'Perfis', icons: 'fas fa-id-card-alt' }
      },
      {
        path: '/especialidades',
        name: 'Especialidades',
        component: () => import('pages/specialities/List.vue'),
        meta: { roles: ['administrador'], name: 'Especialidades  ', icons: 'fas fa-lungs' }
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/patients/List.vue'),
        meta: { roles: ['administrador', 'recepcionista'], name: 'Pacientes  ', icons: 'fas fa-head-side-cough' }
      },
      // {
      //   path: '/tiposExames',
      //   name: 'Tipos de Exames',
      //   component: () => import('pages/types_exams/List.vue'),
      //   meta: { roles: ['administrador'], name: 'Tipos de Exames  ', icons: 'fas fa-microscope' }
      // },
      {
        path: '/requisicoesExames',
        name: 'Requisições de Exames',
        component: () => import('pages/request_exams/List.vue'),
        meta: { roles: ['administrador', 'biomedico'], name: 'Requisições de Exames  ', icons: 'fas fa-file-medical' }
      },
      {
        path: '/resultadosExames',
        name: 'Resultados de Exames',
        component: () => import('pages/result_exams/List.vue'),
        meta: { roles: ['administrador', 'biomedico'], name: 'Resultados de Exames  ', icons: 'fas fa-notes-medical' }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
