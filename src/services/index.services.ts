import axios from 'axios'
import Cookies from 'universal-cookie'


// TOKEN
const cookies = new Cookies()
const authToken = cookies.get('authToken')

// INSTANCIA
export const axiosJsonInstance  = axios.create({
    baseURL: 'https://showroom-back.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}` // Incluye el token en los headers
    }
})

export const axiosMultipartInstance = axios.create({
    baseURL: 'https://showroom-back.onrender.com/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}` // Incluye el token en los headers
    }
});

export default axiosJsonInstance