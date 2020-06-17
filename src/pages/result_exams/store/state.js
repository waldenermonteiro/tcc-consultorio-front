export default function () {
  return {
    resultExams: [],
    columnsResultExamsHistoryPatient: [
      { name: 'created_at', align: 'center', label: 'Data do Resultado', field: 'created_at', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px' }
    ]
  }
}
