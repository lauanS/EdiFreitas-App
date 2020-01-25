import axios from "axios";

export const TOKEN_KEY = "@edifreitas-token";

export const isAuth = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export function login(dados) {
  return axios.post('https://edi-freitas.herokuapp.com/authenticate', dados);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};