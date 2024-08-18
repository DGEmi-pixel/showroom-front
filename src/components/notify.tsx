import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotify } from '@/types/notify';

export const Notify: React.FC<ToastNotify> = ({ message, toastShape, autoClose, toastAnimation, position = "bottom-center", setNotify }) => {
    const notify = useCallback(() => {
        const resolveAfter2Seconds = new Promise<void>(resolve => setTimeout(resolve, 2000));

        toast.promise(resolveAfter2Seconds, {
            pending: "Waiting for the promise to resolve...",
            success: message,
            error: "Promise failed to resolve"
        });
    }, [message]);

    useEffect(() => {
        notify();
        setNotify(false);
        console.log(0);
    }, [notify, setNotify]);

    return null;
};
