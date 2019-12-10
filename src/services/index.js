import axios from "axios";

export const getPeople = () => {
    return axios.get('http://edi-freitas.herokuapp.com/api/responsaveis');
}