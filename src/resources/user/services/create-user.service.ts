import { IUserRepository } from '../protocols/user-repository.protocol';
import { IService } from "../../../common/protocols/service";
import { User, UserCreateProps } from "../user";
import { IPasswordEncrypter } from "../protocols/password-encrypter.protocol";	
import { UserErrorEmailAlreadyRegister } from '../errors/user-email-already-register.error';

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

export class CreateUserService implements IService<Input, Output> {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordEncrypter: IPasswordEncrypter
    ) {}

    public static create(userRepository: IUserRepository, passwordEncrypter: IPasswordEncrypter) {
        return new CreateUserService(userRepository, passwordEncrypter);
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
