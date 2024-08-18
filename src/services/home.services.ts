import { axiosJsonInstance } from './index.services'
import { ApiResponse } from '@/types/api.types'
import { Home } from '@/types/home.types'

const getHomeInfo = async () => {
    try {
        const response = await axiosJsonInstance.get<ApiResponse<Home>>('/showroom/home')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const homeService = {
    getHomeInfo
}