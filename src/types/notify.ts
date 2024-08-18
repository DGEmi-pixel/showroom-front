type ToastNotifyAnimation = 'Bounce' | 'Slide' | 'Zoom'
type ToastNotifyShape = 'info' | 'success' | 'error'
type ToastNotifyPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToastNotify {
    message: string,
    toastAnimation?: ToastNotifyAnimation,
    toastShape: ToastNotifyShape,
    autoClose?: number,
    position?: ToastNotifyPosition,
    setNotify: (value: boolean) => void;
}