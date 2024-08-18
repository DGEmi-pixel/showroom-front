import { useState, useEffect} from 'react'
import { userService } from '@/services/user.services'
import { CustomError } from '@/types/error.types'
import { User } from '@/types/user.types'

//[ ] CONTEXT
import { useAuth } from '@/context/auth.context';

//[ ] HOOK PARA OBTENER EL USUARIO
export const useUserHook = () => {

    //PAYLOAD
    const { payload } = useAuth()

    const [user, setUser] = useState<User>()
    const [userId, setUserId] = useState<string>('')
    const [userLoading, setUserLoading] = useState(true)
    const [userError, setUserError] = useState<CustomError | null>(null)

    const updateUser = async (user: User, userId: string) => {
        try {
            setUserLoading(true)
            const resServ = await userService.updateUser(user,userId)
            return resServ
        } catch (err) {
            const error = err as CustomError             
            setUserError(error)
            console.log(err)
        } finally {
            setUserLoading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserLoading(true)
                const userData = await userService.getUser(payload.username)
                setUser(userData)
                setUserId(userData._id)
            } catch (err) {
                const error = err as CustomError             
                setUserError(error)
                console.log(err)
            } finally {
                setUserLoading(false)
            }
        }

        fetchUser()
    }, [payload])

    return {user, setUser, userId, updateUser, userLoading, userError}
}