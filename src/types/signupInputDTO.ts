import { UserRole } from "../model/User"

export type SignupInputDTO = {
    name: string,
    email: string,
    password: string,
    role: UserRole
}