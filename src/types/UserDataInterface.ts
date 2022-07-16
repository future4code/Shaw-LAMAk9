import { GetUserResponse } from "../types/getUserResponse"
import { User } from "../model/User"

export interface UserDataInterface {
    insert: (user: User) => Promise<void>

    getUserByEmail: (email:string) => Promise<GetUserResponse | undefined>

    getUserById: (id: string) => Promise<GetUserResponse | undefined>
}