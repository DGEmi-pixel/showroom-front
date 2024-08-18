// Servicio que consulta el endpoint
import { axiosJsonInstance } from './index.services'
import { ShowRoom } from '@/types/showroom.types';

const getShowroom = async () => {
    try {
        const response = await axiosJsonInstance.get('/showroom');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const updateShowroom = async (showroomData: ShowRoom, idShowroom: string) => {
    try {
        const response = await axiosJsonInstance.put('/showroom', {showroomData, idShowroom})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const showroomService =
{
    getShowroom,
    updateShowroom
}

