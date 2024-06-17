
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
    token: string;
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
