export default function () {
  return {
    medicalSchedules: [],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Descrição', field: 'name', sortable: true },
      { name: 'date_appointment', align: 'center', label: 'Data da Consulta', field: 'date_appointment', sortable: true },
      { name: 'patient', align: 'center', label: 'Paciente', field: 'patient', sortable: true },
      { name: 'employee', align: 'center', label: 'Médico', field: 'employee', sortable: true },
      { name: 'specialitie', align: 'center', label: 'Especialidade', field: 'specialitie', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 200px' }
    ],
    columnsListOfMedic: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Descrição', field: 'name', sortable: true },
      { name: 'date_appointment', align: 'center', label: 'Data da Consulta', field: 'date_appointment', sortable: true },
      { name: 'patient', align: 'center', label: 'Paciente', field: 'patient', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 100px' }
    ]
  }
}
