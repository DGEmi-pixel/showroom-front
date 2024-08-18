export interface User {
    _id?: string,
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    logoUrl: string,
}

//[ ] INTERFAZ PARCIAL PARA EL LOGIN
export type LoginUser = Pick<User, 'username' | 'password'>