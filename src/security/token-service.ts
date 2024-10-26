import { StandardError } from '../common/error/standard-error';
import jwt, { Algorithm } from "jsonwebtoken";

export interface ITokenService {
    sign(payload: string): string;
    verify(token: string): string;
}

export class TokenService implements ITokenService {
    private readonly secret: string;
    private readonly expiresIn: string;
    private readonly algorithm: Algorithm;

    private constructor() {
        this.secret = process.env.JWT_SECRET || "secret";
        this.expiresIn = "1d";
        this.algorithm = "HS256";
    }

    public static create(): TokenService {
        return new TokenService();
    }

    sign(email: string): string {
        try {
            return jwt.sign({ email }, this.secret, {
                algorithm: this.algorithm,
                expiresIn: this.expiresIn
            });
        }
        catch (error) {
            console.log(error);
            throw StandardError.unauthorized("Error generating token");
        }
    }

    verify(token: string): string {
        const decoded = jwt.verify(token, this.secret);
        if(typeof decoded !== "string") return decoded.email;
        throw StandardError.unauthorized("Invalid token");
    }
}
