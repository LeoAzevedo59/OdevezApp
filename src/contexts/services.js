import axios from 'axios';

const instance = axios.create({
    baseURL: "https://brasilapi.com.br/api/banks/v1"
});

export default instance;