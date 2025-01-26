export interface User {
    id: string;
    username: string;
}


export interface BaseAuthResponse {
    user_id: string;
    username: string;
    refresh_token: string;
    access_token: string;
}

export interface RefreshResponse {
    access: string;
}

export type LoginResponse = BaseAuthResponse;
export type SignUpResponse = BaseAuthResponse;