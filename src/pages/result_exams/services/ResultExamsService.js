import base from '../../../services/base'

export default new (class ResultExams extends base {
  constructor () {
    super('resultExams')
  }

  list = async ($params = '') => {
    try {
      const response = await this.service.get(this.api, { params: $params })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'list')
    }
  };
})()
