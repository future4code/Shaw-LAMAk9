import { GetBandResponse } from "../types/getBandResponse"
import { Band } from "./Band"

export interface BandDataInterface {
    insert: (band: Band) => Promise<void>

    getBandByName: (name: string) => Promise<GetBandResponse>

    getBandById: (id: string) => Promise<GetBandResponse>
}