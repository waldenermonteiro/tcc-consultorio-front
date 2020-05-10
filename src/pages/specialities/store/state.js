export default function () {
  return {
    specialities: [],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 100px' }
    ]
  }
}
