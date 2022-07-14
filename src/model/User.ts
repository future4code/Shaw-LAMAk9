export enum UserRole {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN'
}

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ){}
}