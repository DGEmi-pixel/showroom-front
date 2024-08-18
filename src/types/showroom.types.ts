export interface ShowRoom {
    _id?: string,
    name: string,
    description: string,
    city: string,
    country: string,
    postalCode: string,
    historyAbout: string,
    titleAbout: string,
    imageUrl: string,
    socialMedia: {
        facebook: string,
        twitter: string,
        instagram: string
    },
    supportMail: string,
    phoneNumber: string,
}

//[ ] INTERFAZ PARCIAL PARA EL Address (DASHBOARD)
export type Address = Pick<ShowRoom, 'country' | 'city' | 'postalCode' | 'phoneNumber'>

//[ ] INTERFAZ PARCIAL PARA EL Brand (DASHBOARD)
export type Brand = Pick<ShowRoom, 'name' | 'description' | 'titleAbout' | 'historyAbout'>

//[ ] INTERFAZ PARCIAL PARA EL FORMULARIO DE CONTACTO
export type Contact = Pick<ShowRoom, 'supportMail' |'phoneNumber' | 'country' | 'socialMedia'>