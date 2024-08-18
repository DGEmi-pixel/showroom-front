// src/components/AuthGuard.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie } from '@/utils/cookies.utils';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = getCookie('authToken');

    useEffect(() => {
        if (!token) {
        router.push('/login'); // Redirige al login si no está autenticado
        }
    }, [token, router]);

    // Mientras se redirige, no renderiza nada o puedes mostrar un spinner
    if (!token) {
        return null;
    }

    return <>{children}</>;
};
