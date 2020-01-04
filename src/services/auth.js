import axios from "axios";

export const TOKEN_KEY = "@edifreitas-token";

export const isAuth = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const login = (dados) => {
    axios.post('http://edi-freitas.herokuapp.com/login', dados)
    .then(res => {
        console.log(res)
        sessionStorage.setItem(TOKEN_KEY, "oi");
        return true;
    })
    .catch(res => {
        console.log(res);
        sessionStorage.setItem(TOKEN_KEY, "oi");
        return false;
    });
};

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

