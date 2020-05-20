import base from '../../../services/base'

export default new (class EmployeesService extends base {
  constructor () {
    super('medicalSchedules')
  }

  updateStatus = async ($data, $id) => {
    try {
      const response = await this.service.patch(`${this.api}/alterStatus/${$id}`, $data)
      return response
    } catch (error) {
      throw this.statusResponse(error, 'update')
    }
  };
})()
