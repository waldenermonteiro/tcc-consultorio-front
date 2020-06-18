export default function () {
  return {
    patients: [],
    resultCreate: {},
    cepInformations: {},
    columns: [
      { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
      { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
      { name: 'birth_date', align: 'center', label: 'Data de Nascimento', field: 'birth_date', sortable: true },
      { name: 'rg', align: 'center', label: 'Rg', field: 'rg', sortable: true },
      { name: 'cpf', align: 'center', label: 'Cpf', field: 'cpf', sortable: true },
      { name: 'city', align: 'center', label: 'Cidade', field: 'city', sortable: true },
      { name: 'state', align: 'center', label: 'Estado', field: 'state', sortable: true },
      { name: 'sex', align: 'center', label: 'Sexo', field: 'sex', sortable: true },
      { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: true, headerStyle: 'width: 100px' }
    ],
    optionsUfs: [
      { label: 'AC', value: 'AC' },
      { label: 'AL', value: 'AL' },
      { label: 'AM', value: 'AM' },
      { label: 'AP', value: 'AP' },
      { label: 'BA', value: 'BA' },
      { label: 'CE', value: 'CE' },
      { label: 'DF', value: 'DF' },
      { label: 'ES', value: 'ES' },
      { label: 'GO', value: 'GO' },
      { label: 'MA', value: 'MA' },
      { label: 'GO', value: 'GO' },
      { label: 'MG', value: 'MG' },
      { label: 'MS', value: 'MS' },
      { label: 'MT', value: 'MT' },
      { label: 'PA', value: 'PA' },
      { label: 'PB', value: 'PB' },
      { label: 'PE', value: 'PE' },
      { label: 'PI', value: 'PI' },
      { label: 'PR', value: 'PR' },
      { label: 'RJ', value: 'RJ' },
      { label: 'RN', value: 'RN' },
      { label: 'RO', value: 'RO' },
      { label: 'RR', value: 'RR' },
      { label: 'RS', value: 'RS' },
      { label: 'SC', value: 'SC' },
      { label: 'SE', value: 'SE' },
      { label: 'SP', value: 'SP' },
      { label: 'TO', value: 'TO' }
    ]
  }
}
