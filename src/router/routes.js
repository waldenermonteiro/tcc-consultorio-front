const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Início', component: () => import('pages/Index.vue'), meta: { roles: 'all', name: 'Dashboard', icons: 'dashboard' } },
      {
        path: '/consultas',
        name: 'Consultas',
        component: () => import('pages/medical_schedules/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Consultas', icons: 'settings / person' }
      },
      {
        path: '/funcionarios',
        name: 'Funcionários',
        component: () => import('pages/employees/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Funcionários', icons: 'settings / person' }
      },
      {
        path: '/medicamentos',
        name: 'Medicamentos',
        component: () => import('pages/medicaments/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Medicamentos', icons: 'settings / dashboard' }
      },
      { path: '/perfis', name: 'Perfis', component: () => import('pages/profiles/List.vue'), meta: { roles: 'admin', name: 'Configurações / Perfis', icons: 'settings / person' } },
      {
        path: '/especialidades',
        name: 'Especialidades',
        component: () => import('pages/specialities/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Especialidades  ', icons: 'settings / home' }
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/patients/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Pacientes  ', icons: 'settings / person' }
      },
      {
        path: '/tiposExames',
        name: 'Tipos de Exames',
        component: () => import('pages/types_exams/List.vue'),
        meta: { roles: 'admin', name: 'Configurações / Tipos de Exames  ', icons: 'settings / home' }
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
