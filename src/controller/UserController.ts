import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { UserInputDTO } from "../types/userInputDTO";

export default class UserController{

    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req: Request, res: Response) => {
        const {name, email, password, role} = req.body

        const input: UserInputDTO = {
            name,
            email,
            password,
            role
        }

        try {
            const token = await this.userBusiness.signup(input)

            res.status(201).send({ message: "User created successfully.", token})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Signup error.")
        }
    }
}