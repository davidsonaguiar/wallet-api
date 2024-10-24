import { IUserRepository } from './../protocols/user-protocol-repository';
import { IService } from "./../../../common/protocols/service";
import { StandardError } from "../../../common/error/standard-error";
import { User, UserCreateProps } from "../user";
import { IUserPasswordEncrypter } from "../protocols/user-protocol-password-encrypter";	
import { UserErrorEmailAlreadyRegister } from '../errors/user-error-email-already-register';

export type Input = {
    name: string;
    email: string;
    password: string;
};

export type Output = {
    id: string;
    name: string;
    email: string;
};

export class UserCreateService implements IService<Input, Output> {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordEncrypter: IUserPasswordEncrypter
    ) {}

    public static create(userRepository: IUserRepository, passwordEncrypter: IUserPasswordEncrypter) {
        return new UserCreateService(userRepository, passwordEncrypter);
    }

    public async execute(input: UserCreateProps) {
        const emailAlreadyExists = await this.userRepository.findByEmail(input.email);
        if (emailAlreadyExists) throw UserErrorEmailAlreadyRegister.create(input.email);
        input.password = await this.passwordEncrypter.encrypt(input.password);
        const user = User.create(input);
        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
