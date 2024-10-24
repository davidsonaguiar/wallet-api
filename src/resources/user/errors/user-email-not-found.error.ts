import { StandardError } from '../../../common/error/standard-error';

export class UserEmailNotFound {
    public static create(email: string) {
        return StandardError.notFound(`Email ${email} not found`);
    }
}