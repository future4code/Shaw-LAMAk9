import { Request, Response } from "express"
import BandBusiness from "../business/BandBusiness"
import { GetBandByIdOrNameDTO } from "../types/getBandByIdOrNameDTO"
import { RegisterBandInputDTO } from "../types/registerBandInputDTO"

export default class BandController{

    constructor(
        private bandBusiness: BandBusiness
    ){}

    register = async(req: Request, res: Response) => {
        const token = req.headers.authorization
        const {name, musicGenre, responsible} = req.body

        const input: RegisterBandInputDTO = {
            name,
            musicGenre,
            responsible,
            token
        }

        try {
            this.bandBusiness.register(input)

            res.status(201).send({ message: "Band registered successfully."})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Register error.")
        }
    }

    getBandByIdOrName = async(req: Request, res: Response) => {
        const token = req.headers.authorization
        const { id, name } = req.body

        const input: GetBandByIdOrNameDTO = {
            token,
            id,
            name
        }

        try {
            const band = await this.bandBusiness.getBandByIdOrName(input)

            res.status(200).send({ band })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Register error.")
        }
    }
}