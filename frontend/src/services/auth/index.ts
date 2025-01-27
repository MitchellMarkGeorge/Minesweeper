import { REFRESH_TOKEN_KEY } from "../../utils/constants";
import api from "../api";
import { LoginResponse, RefreshResponse, SignUpResponse } from "./types";

function logIn(username: string, password: string) {
   return api.post<LoginResponse>('auth/user/login/', {
    username,
    password
   });
}

function signUp(username: string, password: string) {
    return api.post<SignUpResponse>('auth/user/signup/', {
        username,
        password
    });
}

function signOut() {
    console.log(localStorage.getItem(REFRESH_TOKEN_KEY))
    return api.post('auth/user/signout/', {
        refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY),
    });
}

function refreshToken() {
    return api.post<RefreshResponse>('auth/token/refresh/', {
        refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
    });
}

export default {
    signUp,
    logIn,
    signOut,
    refreshToken,
}