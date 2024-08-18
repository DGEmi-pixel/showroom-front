import { axiosJsonInstance } from './index.services'

const getAbout = async () => {
    try {
        const data = await axiosJsonInstance.get('/showroom/about')
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const aboutService = {
    getAbout
}