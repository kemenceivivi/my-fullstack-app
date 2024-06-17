import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshToken();
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
    return response.data;
};

export const verifySession = async () => {
    const response = await axios.get('http://localhost:5000/api/auth/verify');
    return response.data;
};

export const refreshToken = async () => {
    const response = await axios.post('http://localhost:5000/api/auth/refresh-token');
    return response.data;
};

export const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout');
};
