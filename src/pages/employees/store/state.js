export default function () {
  return {
    employees: [],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
      { name: 'user', align: 'center', label: 'Email', field: 'user', sortable: true },
      { name: 'specialitie', align: 'center', label: 'Especialidade', field: 'specialitie', sortable: true },
      { name: 'profile', align: 'center', label: 'Perfil', field: 'profile', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 100px' }
    ]
  }
}
