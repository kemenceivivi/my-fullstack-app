import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

interface LoginFormProps {
    onSubmit: (values: { email: string; password: string }, formikHelpers: any) => void;
}

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
                <Form>
                    <Box display="flex" flexDirection="column" maxWidth={400} mx="auto" gap={2}>
                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email ? errors.email : ''}
                        />
                        <TextField
                            type="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password ? errors.password : ''}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
