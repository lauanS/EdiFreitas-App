import axios from "axios";

export const TOKEN_KEY = "@edifreitas-token";
export const TOKENTIME_KEY = "@edifreitas-tokentime"

export const isAuth = () => {
  let tokenLife = 3000000 + 3600000 * 5; //50 minutos + 60minutos * 5 horas === 5h50min
  if(sessionStorage.getItem(TOKEN_KEY) !== null && sessionStorage.getItem(TOKENTIME_KEY) !== null){
    if(Date.now() - sessionStorage.getItem(TOKENTIME_KEY) < tokenLife){
      return true;
    }
    else{
      logout();
      return false;
    }
  }
  else{
    logout();
    return false;
  }
};

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export function login(dados) {
  return axios.post('https://edi-freitas.herokuapp.com/authenticate', dados);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKENTIME_KEY);
};