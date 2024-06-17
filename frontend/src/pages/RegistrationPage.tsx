import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import RegistrationForm from '../components/RegistrationForm';

export interface RegistrationValues {
    email: string;
    username: string;
    password: string;
}

const RegistrationPage = () => {
    const navigate = useNavigate();

    const handleRegistrationSubmit = async (
        values: RegistrationValues,
        { setSubmitting }: FormikHelpers<RegistrationValues>
    ) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', values);
            console.log('User registered:', response.data);
            navigate('/login');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Register error:', error.response ? error.response.data : error.message);
            } else {
                console.error('An unexpected error occurred while trying to register:', error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return <RegistrationForm onSubmit={handleRegistrationSubmit} />;
};

export default RegistrationPage;
