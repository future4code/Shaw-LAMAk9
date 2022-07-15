import BandBusiness from "../src/business/BandBusiness"
import { BandDataMock } from "./mocks/BandDataMock"
import { AuthenticatorMock } from "./mocks/mock_services/AuthenticatorMock"
import { IdGeneratorMock } from "./mocks/mock_services/IdGeneratorMock"
import { UserDataMock } from "./mocks/UserDataMock"

const bandBusiness = new BandBusiness( 
    new BandDataMock(),
    new UserDataMock(),
    new IdGeneratorMock() as any,
    new AuthenticatorMock(),

)

describe("Tests on band register", () => {
    test("Should return 'User must be loged in for access'", async () => {
        expect.assertions(1)
        try {
            const input = {
                name: 'Paraamor',
                musicGenre: 'pop-rock',
                responsible: 'Matesu',
                token: ''
            }
            await bandBusiness.register(input)
        } catch (error) {
            expect(error.message).toBe('User must be loged in for access.')
        }
    })
    
    // test("Should be successfull", async () => {
    //     expect.assertions(0)
    //     try {
    //         const input = {
    //             name: 'Paraamor',
    //             musicGenre: 'pop-rock',
    //             responsible: 'Matesu',
    //             token: 'token'
    //         }
    //         await bandBusiness.register(input)
    //     } catch (error) {
    //         expect(error.message).toBe('User must be loged in for access.')
    //     }
    // })
})