import axios from "axios";

export const getResponsaveis = () => {
  return axios.get('https://edi-freitas.herokuapp.com/api/responsaveis');
}

export const postResponsavel = (responsavel) => {
  axios.post('https://edi-freitas.herokuapp.com/api/responsaveis', responsavel).then(res => {
    console.log(res);
    console.log(res.data);
  });
}

export const delPeople = (id) => {
  return axios.delete('http://edi-freitas.herokuapp.com/api/responsaveis/' + id);
}

export const getCriancas = () => {
  return axios.get('http://edi-freitas.herokuapp.com/api/criancas');
}

