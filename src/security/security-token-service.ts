import { StandardError } from './../common/error/standard-error';
import jwt, { Algorithm } from "jsonwebtoken";

export interface ITokenService {
    sign(payload: string): Promise<string>;
    verify(token: string): Promise<string>;
}

export class SecurityTokenService implements ITokenService {
    private readonly secret: string;
    private readonly expiresIn: number;
    private readonly algorithm: Algorithm;

    private constructor() {
        this.secret = process.env.JWT_SECRET || "secret";
        this.algorithm = "HS256";
    }

    public static create(): SecurityTokenService {
        return new SecurityTokenService();
    }

    async sign(payload: string): Promise<string> {
        try {
            return jwt.sign(payload, this.secret);
        }
        catch (error) {
            throw StandardError.unauthorized("Error generating token");
        }
    }

    async verify(token: string): Promise<string> {
        const decoded = jwt.verify(token, this.secret);
        if(typeof decoded === "string") return decoded;
        throw StandardError.unauthorized("Invalid token");
    }
}
