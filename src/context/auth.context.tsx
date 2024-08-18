'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';


//[ ] TIPOS
import { PayLoad } from '@/types/auth.types';

interface AuthContextType {
    token: string | null;
    payload: PayLoad;
    setToken: (token: string | null) => void;
    setPayLoad: (payload: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('authToken') ?? null);
    const [payload, setPayLoad] = useState<any>(null);
    const router = useRouter();


    useEffect(() => {
        if (token) {
            try {
                // Decodificar el token para obtener el usuario
                const decoded = jwt.decode(token) as PayLoad;
                setPayLoad(decoded);
            } catch (error) {
                console.error('Token inválido o manipulado', error);
                setPayLoad(null);
                setToken(null);
                Cookies.remove('authToken'); // Remover cookie inválida
                router.push('/login'); // Redirigir al login si el token es inválido
            }
            // Decodificar el token para obtener el usuario
            const decoded = jwt.decode(token) as any;
            setPayLoad(decoded)
        } else {
            router.push('/login'); // Redirigir al login si no hay token
        }
    }, [token, router]);

    return (
        <AuthContext.Provider value={{ token, payload, setToken, setPayLoad }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
