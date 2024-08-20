import axios from 'axios'
import Cookies from 'universal-cookie'

// TOKEN
const cookies = new Cookies()
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjRhN2YyNGM1MDgxZjc1OTgyYmFkYyIsInVzZXJuYW1lIjoiZWRpYXoiLCJlbWFpbCI6ImVtaWRpYXo4NzlAZ21haWwuY29tIiwiaWF0IjoxNzE5Njg4MjEwfQ.GDp-XVHgXhuNoFWkAdxN5-9XdBj367MDG4kdgn73Rcc'

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