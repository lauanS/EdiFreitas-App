import axios from "axios";

export const TOKEN_KEY = "@edifreitas-token";

export const isAuth = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const login = (dados) => {
    axios.post('http://edi-freitas.herokuapp.com/login').
    then(res => {
        sessionStorage.setItem(TOKEN_KEY, res.headers.Authorization);
        return true;
    })
    .catch(() => {
        return false;
    });
};

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

