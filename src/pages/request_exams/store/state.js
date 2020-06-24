export default function () {
  return {
    requestExams: [],
    optionsStatus: [
      { label: 'Agendado', value: 'Agendodo' },
      { label: 'Finalizado', value: 'Finalizado' },
      { label: 'Cancelado', value: 'Cancelado' }
    ],
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'created_at', align: 'center', label: 'Data da Requisição', field: 'created_at', sortable: true },
      { name: 'typeExam', align: 'center', label: 'Tipo de exame', field: 'typeExam', sortable: true },
      { name: 'observation', align: 'center', label: 'Observação', field: 'observation', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', headerStyle: 'width: 130px' }
    ]
  }
}
