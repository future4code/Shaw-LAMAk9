import { userTableName } from "../model/TableNames";
import { User } from "../model/User";
import { UserDataInterface } from "../model/UserDataInterface";
import { GetUserResponse } from "../types/getUserResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class UserData extends BaseDatabase implements UserDataInterface {
    private TABLE_NAME = userTableName
    insert = async (user: User) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(user)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const queryResult: GetUserResponse[] = await this.connection(this.TABLE_NAME)
                .where({ email })

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getUserById = async (id: string) => {
        try {
            const queryResult: GetUserResponse[] = await this.connection(this.TABLE_NAME)
                .where({ id })

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }
}