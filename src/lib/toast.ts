// lib/toast.ts

import { createRef } from 'react';

import { SnackbarPayload, SnackbarRef } from '../components/Snackbar';

export const snackbarRef = createRef<SnackbarRef>();

type ToastFn = (payload: SnackbarPayload) => void;

const toast = ((payload: SnackbarPayload) => {
    snackbarRef.current?.show(payload);
}) as ToastFn & {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
};

toast.success = (message, duration) =>
    toast({ message, type: 'success', duration });

toast.error = (message, duration) =>
    toast({ message, type: 'error', duration });

toast.warning = (message, duration) =>
    toast({ message, type: 'warning', duration });

toast.info = (message, duration) =>
    toast({ message, type: 'info', duration });

export default toast;