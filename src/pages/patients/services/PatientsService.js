import base from '../../../services/base'

export default new (class EmployeesService extends base {
  constructor () {
    super('patients')
  }

  searchCep = async ($cep) => {
    try {
      const response = await this.service.get(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${$cep}/json`)
      return response
    } catch (error) {
      throw this.statusResponse(error, 'update')
    }
  };
})()
