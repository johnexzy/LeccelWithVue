// import api from 'axios';
// import { Api_Base } from '@/config/config.js'
const axios = require('axios');
const { Api_Base } = require('../config/config.js');
// export default{
//   api: api.create({baseURL: Api_Base})
// }
module.exports = { api: axios.create({baseURL: Api_Base}) }