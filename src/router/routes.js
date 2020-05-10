const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/medicamentos', component: () => import('pages/medicaments/List.vue'), meta: { name: 'Configurações / Medicamentos', icons: 'settings / card' } },
      { path: '/perfis', component: () => import('pages/profiles/List.vue'), meta: { name: 'Configurações / Perfis', icons: 'settings / person' } },
      { path: '/especialidades', component: () => import('pages/specialities/List.vue'), meta: { name: 'Configurações / Especialidades  ', icons: 'settings / home' } },
      { path: '/tiposExames', component: () => import('pages/types_exams/List.vue'), meta: { name: 'Configurações / Tipos de Exames  ', icons: 'settings / home' } }
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
