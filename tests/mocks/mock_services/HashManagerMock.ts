export class HashManagerMock {

    public hash = (s: string)=> {
       return "senha_Hasheada"
    }
 
    public compareHash = (s: string, hash: string)=> {
       return s === hash
    }
    
 }