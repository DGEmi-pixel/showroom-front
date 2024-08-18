import { useState, useEffect } from 'react'
import { contactService } from '@/services/contact.services'
import { ApiResponse} from '@/types/api.types'
import { Contact } from '@/types/contact.types'

export const useContactHook = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<Contact | null>(null)
    const [error, setError] = useState<string | null>(null);

    const getContactInfo = async () => {
        try {
            setLoading(true)
            setResponse(null)
            setError(null)

            const contactData: ApiResponse<Contact> = await contactService.getContactInfo()

            if(contactData.error) {
                setError(contactData.message)
            } else {
                setResponse(contactData.data || null)
            }
        } catch (err) {
            setError('An unexpected error occurred.') // Manejo de errores inesperados
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContactInfo();
    }, []);

    return { loading, contactInfo: response, error}
}