import {useState, useEffect} from 'react'
import { authService } from '@/services/auth.services'
import { CustomError } from '@/types/error.types'
import { Login, AuthResponse } from '@/types/auth.types'
import { CustomMessage } from '@/types/messages.types'

//[ ] HOOK PARA LOGEARSE

export const useAuthHook = () => {
    const [authLoading, setAuthLoading] = useState(true)
    const [authError, setAuthError] = useState<CustomError | null>(null)

    const auth = async (authData: Login): Promise<CustomMessage | string> => {
        try {
            setAuthLoading(true)
            const resServ = await authService.login(authData)
            return resServ
        } catch (err) {
            const error = err as CustomError
            setAuthError(error)
            throw error
        } finally {
            setAuthLoading(false)
        }
    }

    const logout = async () => {
        try {
            setAuthLoading(true)
            authService.logout()
        } catch (err) {
            const error = err as CustomError
            setAuthError(error)
            throw error
        } finally {
            setAuthLoading(false)
        }
    }

    return { auth, logout }
}
