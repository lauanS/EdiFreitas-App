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

//===================== RESPONSAVEIS =====================
export function getResponsaveis(){
  return api.get('/responsaveis');
}

export function postResponsavel(responsavel){
  return api.post('/responsaveis', responsavel);
}

export function deleteResponsavel(id){
  return api.delete('/responsaveis/' + id);
  
}

export function putResponsavel(responsavel, id){
  return api.put('/responsaveis/' + id, responsavel);
}

//===================== CRIANCAS =====================
export function getCriancas(){
  return api.get('/criancas');
}

export function postCrianca(crianca){
  return api.post('/criancas', crianca);
}

export function deleteCrianca(id){
  return api.delete('/criancas/' + id);
}

export function putCrianca(crianca, id){
  return api.put('/criancas/' + id, crianca);
}

//===================== EVENTOS =====================
export async function getEventos(){
  return await api.get('/eventos');
}

export function postEvento(evento){
  return api.post('/eventos', evento);
}

export function deleteEvento(id){
  return api.delete('/eventos/' + id);
}

export function putEvento(evento, id){
  return api.put('/eventos/' + id, evento);
}

//===================== NOTÍCIAS =====================
export async function getNoticias(){
  return await api.get('/noticias');
}

export function postNoticia(noticia){
  return api.post('/noticias', noticia);
}

export function deleteNoticia(id){
  return api.delete('/noticias/' + id);
}

export function putNoticia(noticia, id){
  return api.put('/noticias/' + id, noticia);
}
