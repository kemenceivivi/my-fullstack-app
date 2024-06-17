
export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}


export interface LoginRequest {
    email: string;
    password: string;
}


export interface LoginResponse {
    status: number;
    username: string;
    message?: string;
}

export interface RegisterResponse {
    status: number;
    message: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
}

export interface ApiErrorModel {
    status: number;
    message: string;
}

export interface ApiErrorResModel {
    message: string;
}