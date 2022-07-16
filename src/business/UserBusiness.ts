import { ConflictError } from "../errors/ConflictError";
import { CustomError } from "../errors/CustomError";
import { InvalidInputError } from "../errors/InvalidInputError";
import { NotFoundError } from "../errors/NotFoundError";
import { User, UserRole } from "../model/User";
import { UserDataInterface } from "../types/UserDataInterface";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserBusiness {

    constructor(
        private userData: UserDataInterface,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    signup = async (input: SignupInputDTO) => {
        const { name, email, password, role } = input
        if (!name || !email || !password || !role) {
            throw new InvalidInputError("Input missing.")
        }
        if (role !== UserRole.NORMAL && role !== UserRole.ADMIN) {
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

        const id = this.idGenerator.generateId()

        const hashPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            role as UserRole
        )
        await this.userData.insert(user)

        const token = this.authenticator.generateToken({ id, role })
        return token
    }

    login = async (input: LoginInputDTO) => {
        const { email, password } = input
        if (!email || !password) {
            throw new InvalidInputError("Input missing.")
        }
        if (!email.includes('@')) {
            throw new InvalidInputError("Invalid email input.")
        }
        if (password.length < 6) {
            throw new InvalidInputError("Password must have at least 6 characters")
        }

        const user = await this.userData.getUserByEmail(email)
        if (!user) {
            throw new NotFoundError("User with this email doesn't exists.");
        }

        const correctPassword = await this.hashManager.compare(password, user.password)
        if (!correctPassword) {
            throw new CustomError(401, "Invalid password.")
        }

        const token = this.authenticator.generateToken({ id: user.id, role: user.role })

        return token
    }
}