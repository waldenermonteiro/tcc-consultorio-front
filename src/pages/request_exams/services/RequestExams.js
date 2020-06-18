import base from '../../../services/base'

export default new (class RequestExams extends base {
  constructor () {
    super('requestExams')
  }

  list = async ($params = '') => {
    try {
      const response = await this.service.get(this.api, { params: $params })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'list')
    }
  };

  updateStatus = async ($data, $id) => {
    try {
      const response = await this.service.patch(`${this.api}/alterStatus/${$id}`, $data)
      return response
    } catch (error) {
      throw this.statusResponse(error, 'update')
    }
  };
})()
