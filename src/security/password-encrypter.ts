import bcrypt from "bcrypt";

export interface IPasswordEncrypter {
    encrypt: (password: string) => Promise<string>;
    compare: (password: string, hash: string) => Promise<boolean>;
}

export class PasswordEncrypter implements IPasswordEncrypter {
    private constructor() {}

    public static create(): PasswordEncrypter {
        return new PasswordEncrypter();
    }

    async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
