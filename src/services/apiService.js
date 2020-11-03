import axios from 'axios';
import { Api_Base } from '@/config/config.js'
/**
 * ApiService Class
 */
class ApiService {
  /**
   * constructor function
   * @param {String} baseUrl API base URL
   */
  constructor() {
    this.api = axios.create({
      baseURL: Api_Base,
      timeout: 40000,
    });
  }

  /**
   * fetch data from endpoint
   * @param {String} endpoint url endpoint to access
   */
  async getData(endpoint) {
    const response = await this.api.get(endpoint);
    return response.data;
  }
}
export default{
  ApiService
}
