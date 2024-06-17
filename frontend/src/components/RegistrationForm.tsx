import React from 'react';
import {Formik, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box } from '@mui/material';
import {RegistrationValues} from "../pages/RegistrationPage";

interface RegistrationFormProps {
    onSubmit: (values: RegistrationValues, formikHelpers: FormikHelpers<RegistrationValues>) => void;
}

const registrationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {

    return (
        <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={registrationSchema}
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
                            helperText={touched.email && errors.email}

                        />
                        <TextField
                            type="text"
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
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
                            helperText={touched.password && errors.password}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Register
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default RegistrationForm;
