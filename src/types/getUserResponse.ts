import { UserRole } from "../model/User"

export type GetUserResponse = {
    id: string
    name: string
    email: string
    password: string
    role: UserRole
}