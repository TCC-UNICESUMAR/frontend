import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://192.168.20.114:8080/',
});

export default Api;