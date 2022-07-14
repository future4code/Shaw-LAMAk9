import { UserRole } from "../model/User"

export interface AuthenticationData {
    id: string
    role: UserRole
}