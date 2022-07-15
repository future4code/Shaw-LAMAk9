import { Band } from "../model/Band"
import { BandDataInterface } from "../model/BandDataInterface"
import { bandTableName } from "../model/TableNames"
import { GetBandResponse } from "../types/getBandResponse"
import { BaseDatabase } from "./BaseDatabase"

export default class BandData extends BaseDatabase implements BandDataInterface {
    private TABLE_NAME = bandTableName
    insert = async (band: Band) => {
        try {
            await this.connection(this.TABLE_NAME)
                .insert(band)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getBandByName = async (name: string) => {
        try {
            const queryResult: GetBandResponse[] = await this.connection(this.TABLE_NAME)
                .where({ name })

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Database error.")
            }
        }
    }

    getBandById = async (id: string) => {
        try {
            const queryResult: GetBandResponse[] = await this.connection(this.TABLE_NAME)
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