import base from '../../../services/base'

export default new (class UserService extends base {
  constructor () {
    super('users')
  }

  login = async $data => {
    try {
      const { data } = await this.service.post(`${this.api}/login`, $data)
      return data
    } catch (error) {
      throw this.statusResponse(error, 'login')
    }
  };
})()
