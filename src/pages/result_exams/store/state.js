export default function () {
  return {
    resultExams: [],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'created_at', align: 'center', label: 'Data do Resultado', field: 'created_at', sortable: true },
      { name: 'patient', align: 'center', label: 'Paciente', field: 'patient', sortable: true },
      { name: 'medicalSchedule', align: 'center', label: 'Médico', field: 'medicalSchedule', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px' }
    ],
    columnsResultExamsHistoryPatient: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'created_at', align: 'center', label: 'Data do Resultado', field: 'created_at', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px' }
    ]
  }
}
