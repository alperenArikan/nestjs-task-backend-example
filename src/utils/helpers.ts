import jwt from "jsonwebtoken";
import bc from "bcrypt";

export class AuthService {
    static async getHashedPassword(plainPassword: string): Promise<string> {
        const hashedPassword = await bc.hash(plainPassword, 8);
        return hashedPassword;
    }
    static async comparePasswordAndHash(
        plainPassword: string,
        hash: string
    ): Promise<boolean> {
        const isMatch = await bc.compare(plainPassword, hash);
        return isMatch;
    }
    static async getJwtToken(payload: { email: string; id: string }) {
     const secret = "pokemon"
        const token = await jwt.sign(payload,secret );
        return token;
    }

    static verifyJwtToken(token: string) {
        const secret = "pokemon"

        const isValid = jwt.verify(token, secret);
        return isValid;
    }
}



export class HelperService {


    static checkIsValidEmail(email: string) {
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return regexEmail.test(email);
    
    }
}
