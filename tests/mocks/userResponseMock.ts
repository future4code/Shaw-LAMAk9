import { UserRole } from "../../src/model/User";
import { GetUserResponse } from "../../src/types/getUserResponse";

export const userResponseMocks: GetUserResponse = {
    id: "id_mock1",
    name: "mock1",
    email: "mock1@gmail.com",
    password: "mocks123",
    role: UserRole.ADMIN
}

export const userResponseMocks2: GetUserResponse = {
    id: "id_mock2",
    name: "mock2",
    email: "mock2@gmail.com",
    password: "mocks123",
    role: UserRole.NORMAL
}