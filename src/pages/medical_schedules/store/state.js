export default function () {
  return {
    medicalSchedules: [],
    medicalSchedulesCustom: [],
    optionsStatus: [
      { label: 'Agendada', value: 'Agendada' },
      { label: 'Finalizada', value: 'Finalizada' },
      { label: 'Cancelada', value: 'Cancelada' }
    ],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Descrição', field: 'name', sortable: true },
      { name: 'date_appointment', align: 'center', label: 'Data da Consulta', field: 'date_appointment', sortable: true },
      { name: 'patient', align: 'center', label: 'Paciente', field: 'patient', sortable: true },
      { name: 'employee', align: 'center', label: 'Médico', field: 'employee', sortable: true },
      { name: 'specialitie', align: 'center', label: 'Especialidade', field: 'specialitie', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px' }
    ],
    columnsListOfMedic: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Descrição', field: 'name', sortable: true },
      { name: 'date_appointment', align: 'center', label: 'Data da Consulta', field: 'date_appointment', sortable: true },
      { name: 'patient', align: 'center', label: 'Paciente', field: 'patient', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 100px' }
    ],
    columnsHistoryPatient: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'date_appointment', align: 'center', label: 'Data da Consulta', field: 'date_appointment', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px', sortable: true }
    ]
  }
}
