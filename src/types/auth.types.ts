import { CustomMessage } from "./messages.types"

export interface Login {
    username: string,
    password: string
}

export interface PayLoad {
    username: string,
    logoUrl: string,
}

export type AuthResponse = string | CustomMessage