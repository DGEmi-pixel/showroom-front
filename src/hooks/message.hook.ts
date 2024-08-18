import { useState } from 'react'
import { messageService } from '@/services/message.services'
import { ApiResponse, ApiError } from '@/types/api.types'
import { MessageContact } from '@/types/message.types'

export const useMessageHook = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<MessageContact | null>(null)
    const [error, setError] = useState<string | null>(null);

    const sendMail = async (to: string, name: string, subject: string, text: string) => {
        try {
            setLoading(true)
            setResponse(null)
            setError(null)

            const resDB: ApiResponse<MessageContact> = await messageService.sendMail(to, name, subject, text)

            if(resDB.error) {
                setError(resDB.message)
            } else {
                setResponse(resDB.data || null)
            }
        } catch (err) {
            setError('An unexpected error occurred.') // Manejo de errores inesperados
        } finally {
            setLoading(false)
        }
    }

    return { loading, response, error, sendMail}
}