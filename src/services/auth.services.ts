import { axiosJsonInstance } from './index.services'
import { AuthResponse, Login } from '@/types/auth.types'
import { CustomMessage } from '@/types/messages.types'
import Cookies from 'js-cookie';


const login = async (loginData: Login, rememberMe: boolean): Promise<AuthResponse> => {

    try {
        const resDB = await axiosJsonInstance.post('/user/login', {...loginData})
        if(resDB.data && typeof resDB.data === 'string') {
            const expiresInDays = rememberMe ? 30 : 1
            
            // ALMACENAR EL TOKEN EN LAS COOKIES
            Cookies.set('authToken', resDB.data, { expires: expiresInDays});
            return resDB.data //RETORNA EL TOKEN CRUDO
        } else {
            return resDB.data as CustomMessage
        }
    } catch (error) {
        throw error
    }
}

const logout = async () => {
    Cookies.remove('authToken')
    window.location.href = '/login'
}

export const authService = 
{
    login,
    logout
}