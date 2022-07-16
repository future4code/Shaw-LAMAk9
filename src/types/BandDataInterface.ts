import { GetBandResponse } from "./getBandResponse"
import { Band } from "../model/Band"
import { GetInsertResponse } from "./getInsertResponse"

export interface BandDataInterface {
    insert: (band: Band) => Promise<GetInsertResponse>

    getBandByName: (name: string) => Promise<GetBandResponse | undefined>

    getBandById: (id: string) => Promise<GetBandResponse | undefined>

    getBandByResponsible: (responsible: string) => Promise<GetBandResponse | undefined>
}