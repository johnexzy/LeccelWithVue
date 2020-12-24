const axios = require('axios');
const devMode = false;
const Api_Base = devMode ? 'http://127.0.0.1:8090' : 'https://app.leccel.net'
module.exports = {
    Api_Base: Api_Base,
    api: axios.create({ baseURL: Api_Base })
}