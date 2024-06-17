import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {logout, refreshToken} from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await refreshToken();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        }, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('context error');
    }
    return context;
};
