import { useState, useEffect } from 'react'
import { homeService } from '@/services/home.services'
import { ApiResponse} from '@/types/api.types'
import { Home } from '@/types/home.types'

export const useHomeHook = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<Home | null>(null)
    const [error, setError] = useState<string | null>(null);

    const getHomeInfo = async () => {
        try {
            setLoading(true)
            setResponse(null)
            setError(null)

            const homeData: ApiResponse<Home> = await homeService.getHomeInfo()

            if(homeData.error) {
                setError(homeData.message)
            } else {
                setResponse(homeData.data || null)
            }
        } catch (err) {
            setError('An unexpected error occurred.') // Manejo de errores inesperados
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHomeInfo();
    }, []);

    return { loading, homeData: response, error}
}