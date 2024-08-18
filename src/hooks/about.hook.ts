import {useState, useEffect} from 'react'
import { aboutService } from '@/services/about.services'
import { CustomError } from '@/types/error.types'
import { About } from '@/types/about.types'

//[ ] HOOK PARA OBTENER EL ABOUT

export const useAboutHook = () => {
    const [about, setAbout] = useState<About>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                setLoading(true)
                const aboutData = await aboutService.getAbout()
                setAbout(aboutData)
            } catch (err) {
                const error = err as CustomError             
                setError(error)
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchAbout()
    }, [])

    return {about, setAbout, loading, error}
}