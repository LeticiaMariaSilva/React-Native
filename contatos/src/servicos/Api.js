import axios from 'axios';

const api = axios.create({
    baseURL: "https://limeiraweb.com.br/api/contato"
})

export default api