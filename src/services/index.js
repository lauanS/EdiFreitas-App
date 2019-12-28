import axios from "axios";

export const getPeople = () => {
    console.log("s");
    return axios.get('https://edi-freitas.herokuapp.com/api/responsaveis');
}

export const postResponsavel = (responsavel) => {
    axios.post('https://edi-freitas.herokuapp.com/api/responsaveis', responsavel).then(res => {
        console.log(res);
        console.log(res.data);
      });
}