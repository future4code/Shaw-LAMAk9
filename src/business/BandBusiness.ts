import { InvalidInputError } from "../errors/InvalidInputError"
import { RegisterBandInputDTO } from "../types/registerBandInputDTO"
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ConflictError } from "../errors/ConflictError";
import { Band } from "../model/Band";
import { IdGenerator } from "../services/IdGenerator";
import { GetBandByIdOrNameDTO } from "../types/getBandByIdOrNameDTO";
import { BandDataInterface } from "../types/BandDataInterface";
import { UserDataInterface } from "../types/UserDataInterface";

export default class BandBusiness {

    constructor(
        private bandData: BandDataInterface,
        private userData: UserDataInterface,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    register = async (input: RegisterBandInputDTO) => {
        const { name, musicGenre, responsible, token } = input
        
        if (!token) {
            throw new InvalidInputError("User must be loged in for access.")
        }
        if (!name || !musicGenre || !responsible) {
            throw new InvalidInputError("Input missing.")
        }
        
        const role = this.authenticator.getTokenData(token).role
        const userId = this.authenticator.getTokenData(token).id
        const user = await this.userData.getUserById(userId)
        if (!user) {
            throw new InvalidInputError("No user match this token.")
        }
        if (role !== UserRole.ADMIN) {
            throw new UnauthorizedError("User unauthorized. Only admin have this access.")
        }

        const registeredBand = await this.bandData.getBandByName(name)
        if (registeredBand) {
            throw new ConflictError("Band with this name already exists.");
        }
        const samePersonResponsible = await this.bandData.getBandByResponsible(responsible)
        if (samePersonResponsible) {
            throw new ConflictError("This person is already responsible for a band.");
        }

        const bandId = this.idGenerator.generateId()

        const band = new Band(
            bandId,
            name,
            musicGenre,
            responsible
        )

        const response = await this.bandData.insert(band)        
        const message = response.id === bandId ? "Band registered successfully." : "Error on database response."

        return message
    }

    getBandByIdOrName = async (input: GetBandByIdOrNameDTO) => {
        const { token, id, name } = input
        const userId = this.authenticator.getTokenData(token).id

        if (!token) {
            throw new InvalidInputError("User must be loged in for access.")
        }
        if (!name && !id) {
            throw new InvalidInputError("Input missing.")
        }

        const user = await this.userData.getUserById(userId)
        if (!user) {
            throw new InvalidInputError("No user match this token.")
        }

        let band
        id ? 
        band = await this.bandData.getBandById(id) :
        band = await this.bandData.getBandByName(name as string)
        
        return band
    }
}