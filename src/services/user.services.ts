// Servicio que consulta el endpoint
import {axiosJsonInstance} from './index.services'
import { User } from '@/types/user.types';

const getUser = async (username: string) => {
    try {
        console.log(username)
        const response = await axiosJsonInstance.post('/user/username', {username});
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (userData: User, userId: string) => {
    try {
        const response = await axiosJsonInstance.put('/user', {userData, userId})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const userService =
{
    getUser,
    updateUser
}

