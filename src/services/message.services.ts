import { axiosJsonInstance } from './index.services'
import { ApiResponse } from '@/types/api.types'
import { MessageContact } from '@/types/message.types'

const sendMail = async (to: string, name: string, subject: string, text: string) => {
    try {
        const response = await axiosJsonInstance.post<ApiResponse<MessageContact>>('/contact', {to, name, subject, text})
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const messageService = {
    sendMail
}