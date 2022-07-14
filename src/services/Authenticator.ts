import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../types/user";

export class Authenticator {

    static generateToken(info: AuthenticationData): string{

        const token = jwt.sign(
            info,
            process.env.JWT_KEY as string,
            {}
        )
        return token;
    }

    static getTokenData(token: string): AuthenticationData {

        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        );

        return payload as AuthenticationData

    }
}