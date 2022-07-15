import { User } from "../../src/model/User";
import { UserDataInterface } from "../../src/model/UserDataInterface";
import { userResponseMocks, userResponseMocks2 } from "./userResponseMock";

export class UserDataMock implements UserDataInterface {
    
    insert = async (user: User) => {}

    getUserByEmail = async (email: string) => {
        switch(email){
            case "mock1@gmail.com":
               return userResponseMocks
            case "mock2@gmail.com":
               return userResponseMocks2
            default:
               undefined
        }
    }

    getUserById = async (id: string) => {
        switch(id){
            case "id_mock1":
               return userResponseMocks
            case "id_mock2":
               return userResponseMocks2
            default:
               undefined
        }
    }
}