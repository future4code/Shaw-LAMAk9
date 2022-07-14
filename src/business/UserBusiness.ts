import UserData from "../data/UserData";
import { ConflictError } from "../errors/ConflictError";
import { InvalidInputError } from "../errors/InvalidInputError";
import { User, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserInputDTO } from "../types/userInputDTO";

export default class UserBusiness {

    constructor(
        private userData: UserData
    ) { }

    signup = async (input: UserInputDTO) => {
        const { name, email, password, role } = input
        if (!name || !email || !password || !role) {
            throw new InvalidInputError("Input missing.")
        }
        if (role !== "NORMAL" && role !== "ADMIN") {
            throw new InvalidInputError("User role must be 'NORMAL' or 'ADMIN'.")
        }
        if (!email.includes('@')) {
            throw new InvalidInputError("Invalid email input.")
        }
        if (password.length < 6) {
            throw new InvalidInputError("Password must have at least 6 characters")
        }

        const registeredUser = await this.userData.getUserByEmail(email)
        if (registeredUser) {
            throw new ConflictError("User with this email already exists.");
        }

        const id = IdGenerator.generateId()

        const hashPassword = await HashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            role as UserRole
        )
        await this.userData.insert(user)

        const token = Authenticator.generateToken({ id, role })
        return token
    }
}