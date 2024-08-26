import {useState, useEffect} from 'react'
import { showroomService } from '@/services/showroom.services'
import { CustomError } from '@/types/error.types'
import { ShowRoom } from '@/types/showroom.types'

//[ ] HOOK PARA OBTENER EL ABOUT

export const useShowroomHook = () => {
    const [showroom, setShowroom] = useState<ShowRoom>()
    const [idShowroom, setIdShowroom] = useState<string>('')
    const [showroomLoading, setShowroomLoading] = useState(true)
    const [showroomError, setShowroomError] = useState<CustomError | null>(null)

    const updateShowRoom = async (showroom: ShowRoom, idShowroom: string) => {
        try {
            setShowroomLoading(true)
            const resServ = await showroomService.updateShowroom(showroom,idShowroom)
            if(resServ.error === false){
                //[ ]ACTUALIZAMOS EL SHOWROOM
                setShowroom(resServ.data)
            }
            return resServ
        } catch (err) {
            const error = err as CustomError             
            setShowroomError(error)
        } finally {
            setShowroomLoading(false)
        }
    }

    useEffect(() => {
        const fetchShowRoom = async () => {
            try {
                setShowroomLoading(true)
                const showroomData = await showroomService.getShowroom()
                setShowroom(showroomData)
                setIdShowroom(showroomData._id)
            } catch (err) {
                const error = err as CustomError             
                setShowroomError(error)
            } finally {
                setShowroomLoading(false)
            }
        }

        fetchShowRoom()
    }, [])

    return {showroom, setShowroom, idShowroom, updateShowRoom, showroomLoading, showroomError}
}