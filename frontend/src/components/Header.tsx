import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

/**
 * Header component that displays navigation links and logout button based on authentication state.
 * @component
 */

const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    /**
     * Handles user logout by calling the logout service, updating authentication state,
     * and navigating to the login page.
     * @async
     */

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Pokemon
                </Typography>
                {!isAuthenticated && (
                    <>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <Button color="inherit" component={RouterLink} to="/caught">
                            Caught Pokemons
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/dashboard">
                            Dashboard
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
