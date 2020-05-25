export default function () {
  return {
    medicaments: [],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Nome Genérico', field: 'name', sortable: true },
      { name: 'factory', align: 'center', label: 'Nome de Fábrica', field: 'factory', sortable: true },
      { name: 'manufacturer', align: 'center', label: 'Fabricante', field: 'manufacturer', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 100px' }
    ]
  }
}
