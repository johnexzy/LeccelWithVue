const axios = require('axios');

const Api_Base = 'http://127.0.0.1:8090'
const config = {
    Api_Base: Api_Base,
    api: axios.create({baseURL: Api_Base})
}

module.exports = config