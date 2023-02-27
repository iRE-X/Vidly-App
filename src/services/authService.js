import http from "./httpService";
import jwtDecode from "jwt-decode";

const authEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export async function login(email, password) {
    const { data: jwt } = await http.post(authEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

const auth = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt,
};

export default auth;
