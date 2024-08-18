import { Season } from "./product.types"

export type RegisterFormValues = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    repeatPassword: string
}

export type LoginFormValues = {
    username: string
    password: string

}

export type ModalFormValues = {
    name: string
    showroomName: string,
    lastName: string
    email: string
    username: string
    password: string
    repeatPassword: string
    country: string
    city: string
    postalCode: string
    phoneNumber: string
    titleAbout: string
    description: string
    historyAbout: string
}

export type ProductModalFormValues = {
    name: string,
    description: string,
    price: number,
    // offer: number,
    discount?: number,
    // season: string,
    // type: string,
    brand: string,
    clothsize: number,
    colors: string[],
    sizes: number[]
}