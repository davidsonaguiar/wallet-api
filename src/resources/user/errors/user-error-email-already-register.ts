import { StandardError } from './../../../common/error/standard-error';

export class UserErrorEmailAlreadyRegister {
    public static create(email: string) {
        return StandardError.conflict(`Email ${email} already registered`);
    }
}