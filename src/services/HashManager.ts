import * as bcrypt from "bcryptjs";

export class HashManager {
    
   static async hash(s: string): Promise<string>{
        //para esconder o texto precisamos:
        //do plaintext (que é nosso parametro s)
        //do nosso cost (que é o quanto vamos demorar pra esconder.
        //Quanto maior, mais escondido)
        //do salt (string aleatória que vai ser gerada aqui na função,
        //a partir do cost)

        const cost = Number(process.env.BCRYPT_COST!);
        const salt = await bcrypt.genSalt(cost);
        const cypherText = await bcrypt.hash(s, salt);

        return cypherText;
    }

    static async compare(plaintext: string, hash: string): Promise<boolean>{
        const hashCompare:boolean = await bcrypt.compare(plaintext, hash);
        return hashCompare;
    }
}