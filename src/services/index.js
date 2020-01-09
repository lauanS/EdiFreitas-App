import axios from "axios";
import {getToken} from './auth'

const api = axios.create({
  baseURL: 'https://edi-freitas.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if(token){
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export const getResponsaveis = () => {
  return api.get('/responsaveis');
}

export const postResponsavel = (responsavel) => {
  return api.post('/responsaveis', responsavel);
}

export const deleteResponsavel = (id) => {
  return api.delete('/responsaveis/' + id);
  
}

export const getCriancas = () => {
  return api.get('/criancas');
}

export const postCrianca = (crianca) => {
  return api.post('/criancas', crianca);
}

export const deleteCrianca = (id) => {
  return api.delete('/criancas/' + id);
}

export const putCrianca = (crianca, id) => {
  return api.put('/criancas/' + id, crianca);
}


