import axios from "axios";
//import {getToken} from './auth'

const api = axios.create({
  baseURL: 'https://edi-freitas.herokuapp.com/api'
});

/*api.interceptors.request.use(async config => {
  const token = getToken();
  if(token){
    config.headers.Authorization = 'Bearer ${token}';
  }
  return config;
});*/

export const getResponsaveis = () => {
  return api.get('/responsaveis');
}

export const postResponsavel = (responsavel) => {
  api.post('/responsaveis', responsavel).then(res => {
    console.log(res);
    console.log(res.data);
  });
}

export const deleteResponsavel = (id) => {
  return api.delete('/responsaveis/' + id);
}

export const getCriancas = () => {
  return api.get('/criancas');
}

export const postCrianca = (crianca) => {
  api.post('/crianca', crianca).then(res => {
    return true;
  })
  .catch(res => {
    return false;
  });
}

export const deleteCrianca = (id) => {
  return api.delete('/criancas/' + id);
}



