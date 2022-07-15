import { UserRole } from "../../../src/model/User";
import { AuthenticationData } from "../../../src/types/authData";

export class AuthenticatorMock {

    generateToken(): string{
        return 'TOKEN'
    }

    getTokenData(): AuthenticationData {
        const object = { id: 'id_mock1', role: UserRole.ADMIN}
        return object

    }
}