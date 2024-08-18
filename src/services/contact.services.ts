import { axiosJsonInstance } from './index.services'
import { ApiResponse } from '@/types/api.types'
import { Contact } from '@/types/contact.types'

const getContactInfo = async () => {
    try {
        const response = await axiosJsonInstance.get<ApiResponse<Contact>>('/showroom/contact')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const contactService = {
    getContactInfo
}