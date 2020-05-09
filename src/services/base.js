import { HTTPClient } from '../boot/axios'
import { statusResponse } from './responseService'
export default class Base {
  constructor (api) {
    this.api = api
    this.service = HTTPClient
    this.statusResponse = statusResponse
  }

  list = async ($params = '') => {
    try {
      const response = await this.service.get(this.api, { params: $params })
      return response
    } catch (error) {
      throw statusResponse(error, 'list')
    }
  };

  get = async $id => {
    try {
      const response = await this.service.get(`${this.api}/${$id}`)
      return response
    } catch (error) {
      throw statusResponse(error, 'get', 'item')
    }
  };

  create = async $data => {
    try {
      const response = await this.service.post(this.api, $data)
      return response
    } catch (error) {
      throw statusResponse(error, 'create')
    }
  };

  createNoId = async ($data, $id) => {
    try {
      const response = await this.service.post(`${this.api}/${$id}`, $data)
      return response
    } catch (error) {
      throw statusResponse(error, 'create')
    }
  };

  update = async ($data, $id) => {
    try {
      const response = await this.service.put(`${this.api}/${$id}`, $data)
      return response
    } catch (error) {
      throw statusResponse(error, 'update')
    }
  };

  updateNoId = async $data => {
    try {
      const response = await this.service.put(`${this.api}`, $data)
      return response
    } catch (error) {
      throw statusResponse(error, 'update')
    }
  };

  remove = async $id => {
    try {
      const response = await this.service.delete(`${this.api}/${$id}`)
      return response
    } catch (error) {
      throw statusResponse(error, 'remove')
    }
  };

  reportPdfGet = async (api, $params) => {
    try {
      const response = await this.service.get(api, { params: $params, headers: { Accept: 'application/pdf' }, responseType: 'arraybuffer' })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'report')
    }
  };

  reportExcelGet = async (api, $params) => {
    try {
      const response = await this.service.get(api, { params: $params, headers: { Accept: 'application/excel' }, responseType: 'arraybuffer' })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'report')
    }
  };

  reportPdfPost = async (api, $params) => {
    try {
      const response = await this.service.post(api, $params, { headers: { Accept: 'application/pdf' }, responseType: 'arraybuffer' })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'report')
    }
  };

  reportExcelPost = async (api, $params) => {
    try {
      const response = await this.service.post(api, $params, { headers: { Accept: 'application/excel' }, responseType: 'arraybuffer' })
      return response
    } catch (error) {
      throw this.statusResponse(error, 'report')
    }
  };
}
