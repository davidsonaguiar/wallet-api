import { IService } from "./../../../common/protocols/service";
import { ErrorStandard } from "./../../../error/error-standard";
import { User, UserCreateProps } from "../user";
import { IUserRepository } from "../protocols/user-repository";
import { IUserPasswordEncrypter } from "../protocols/user-password-encrypter";

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
        if (emailAlreadyExists) ErrorStandard.conflict("Email already exists");
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
