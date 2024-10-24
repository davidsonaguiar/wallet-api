import { UserEmailNotFound } from "../errors/user-email-not-found.error";
import { IUserRepository } from "../protocols/user-repository.protocol";
import { User } from "../user";

export class FindUserByEmailService {
    private constructor(
        private readonly userRepository: IUserRepository
    ){}

    public static create(userRepository: IUserRepository) {
        return new FindUserByEmailService(userRepository);
    }

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw UserEmailNotFound.create(email);
        return user;
    }
}