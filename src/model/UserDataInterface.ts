import { GetUserResponse } from "../types/getUserResponse"
import { User } from "./User"

export interface UserDataInterface {
    insert: (user: User) => Promise<void>

    getUserByEmail: (email:string) => Promise<GetUserResponse>

    getUserById: (id: string) => Promise<GetUserResponse>
}