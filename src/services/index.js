import axios from "axios";

export const getPeople = () => {
    return axios.get('http://edi-freitas.herokuapp.com/api/responsaveis');
}

export const postResponsavel = (responsavel) => {
    axios.post('http://edi-freitas.herokuapp.com/api/responsaveis', responsavel).then(res => {
        console.log(res);
        console.log(res.data);
      });
}