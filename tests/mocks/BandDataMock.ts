import { Band } from "../../src/model/Band"
import { BandDataInterface } from "../../src/model/BandDataInterface"
import { bandResponseMocks, bandResponseMocks2 } from "./bandResponseMock"

export class BandDataMock implements BandDataInterface {
    
    insert = async (band: Band) => {}

    getBandByName = async (name: string) => {
        switch(name){
            case "mock1@gmail.com":
               return bandResponseMocks
            case "mock2@gmail.com":
               return bandResponseMocks2
            default:
               undefined
        }
    }

    getBandById = async (id: string) => {
        switch(id){
            case "id_mock1":
               return bandResponseMocks
            case "id_mock2":
               return bandResponseMocks2
            default:
               undefined
        }
    }
}