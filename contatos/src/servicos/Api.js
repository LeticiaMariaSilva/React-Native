import axios from 'axios';

export const api = axios.create({
    baseURL: "https://limeiraweb.com.br/api/contato",

})

export const apiTarefas = axios.create({
    baseURL: "https://limeiraweb.com.br/api/tarefas",

})