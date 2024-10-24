import bcrypt from "bcrypt";

import { IUserPasswordEncrypter } from "../resources/user/protocols/user-protocol-password-encrypter";

export class PasswordEncrypter implements IUserPasswordEncrypter {
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
