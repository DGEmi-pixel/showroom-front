import Cookies from 'js-cookie';

//[ ] ESTE MÉTODO OBTIENE LA COOKIE DEL NAV
export const getCookie = (name: string): string | undefined => {
    return Cookies.get(name)
}