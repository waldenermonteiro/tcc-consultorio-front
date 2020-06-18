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
        meta: { roles: ['Medico', 'patient'], acess: true, name: 'Dashboard', icons: 'home' }
      },
      {
        path: '/consultas',
        name: 'Consultas',
        component: () => import('pages/medical_schedules/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Consultas', icons: 'person' }
      },
      {
        path: '/consultas-medico',
        name: 'Consultas de Hoje',
        component: () => import('pages/medical_schedules/ListOfMedic.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Consultas', icons: 'person' }
      },
      {
        path: '/funcionarios',
        name: 'Funcionários',
        component: () => import('pages/employees/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Funcionários', icons: 'person' }
      },
      {
        path: '/medicamentos',
        name: 'Medicamentos',
        component: () => import('pages/medicaments/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Medicamentos', icons: 'dashboard' }
      },
      {
        path: '/perfis',
        name: 'Perfis',
        component: () => import('pages/profiles/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Perfis', icons: 'person' }
      },
      {
        path: '/especialidades',
        name: 'Especialidades',
        component: () => import('pages/specialities/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Especialidades  ', icons: 'home' }
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/patients/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Pacientes  ', icons: 'person' }
      },
      {
        path: '/tiposExames',
        name: 'Tipos de Exames',
        component: () => import('pages/types_exams/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Tipos de Exames  ', icons: 'home' }
      },
      {
        path: '/requisicoesExames',
        name: 'Requisições de Exames',
        component: () => import('pages/request_exams/List.vue'),
        meta: { roles: ['Medico', 'patient'], name: 'Requisições de Exames  ', icons: 'home' }
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
