import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

interface LoginValues {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
    ) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', values);
            console.log(response.data)
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Login failed', error.response ? error.response.data : 'An unknown error occurred');
            } else {
                console.error('Login failed', error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
