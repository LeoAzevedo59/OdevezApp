import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.leonardo2209202332.bateaquihost.com.br/api/v1/" //produção
    // baseURL: "http://192.168.1.12:3000/api/v1/" //teste
});

export default instance;