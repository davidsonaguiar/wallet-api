import bcrypt from "bcrypt";

import { IUserPasswordEncrypter } from "../protocols/user-password-encrypter";


export class UserProviderPasswordEncrypter implements IUserPasswordEncrypter {
    private constructor() {}

    public static create(): UserProviderPasswordEncrypter {
        return new UserProviderPasswordEncrypter();
    }

    async encrypt (password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    }

    async compare (password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
