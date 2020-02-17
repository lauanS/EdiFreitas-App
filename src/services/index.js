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

export async function postNoticia(noticia){
  return await api.post('/noticias', noticia);
}

export async function deleteNoticia(id){
  return await api.delete('/noticias/' + id);
}

export async function putNoticia(noticia, id){
  return await api.put('/noticias/' + id, noticia);
}

//===================== IMAGEM =====================
export async function postImagem(imagem){
  return await api.post('/imagem/upload', imagem);
}

export async function getImagem(id){
  return await api.get('/imagem/' + id);
}

export async function updateImagem(id, imagem){
  return await api.put('/imagem/upload/' + id, imagem);
}

export async function deleteImagem(id){
  return await api.delete('/imagem/' + id);
}

//===================== ALBUM =====================
export async function postAlbum(album){
  return await api.post('/album', album);
}

export async function getAlbum(){
  return await api.get('/album');
}

export async function deleteAlbum(id){
  return await api.delete('/album/' + id);
}
