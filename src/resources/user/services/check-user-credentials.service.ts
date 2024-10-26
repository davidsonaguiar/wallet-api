import {IService} from "../../../common/protocols/service.protocol";
import {IUserRepository} from "../protocols/user-repository.protocol";
import {IPasswordEncrypter} from "../../../security/password-encrypter";

export type CheckUserCredentialsInput = {
  email: string;
  password: string;
}

export type CheckUserCredentialsOutput = boolean

export class CheckUserCredentialsService implements IService<CheckUserCredentialsInput, CheckUserCredentialsOutput> {
    private constructor(
        private readonly usersRepository: IUserRepository,
        private readonly passwordEncrypter: IPasswordEncrypter
    ) {}

    public static create(usersRepository: IUserRepository, passwordEncrypter: IPasswordEncrypter): CheckUserCredentialsService {
        return new CheckUserCredentialsService(usersRepository, passwordEncrypter);
    }

    public async execute(input: CheckUserCredentialsInput): Promise<CheckUserCredentialsOutput> {
        const user = await this.usersRepository.findByEmail(input.email);
        if (!user) return false;
        return await this.passwordEncrypter.compare(input.password, user.password);
    }
}