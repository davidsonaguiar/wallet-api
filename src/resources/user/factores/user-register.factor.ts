import { UserRegisterController } from '../controllers/user-register.controller';
import { prismaClient } from "../../../libs/prisma/prisma-client";
import { UserRepositoryPrisma } from "../../../libs/prisma/repositories/user-repository";
import { PasswordEncrypter } from "../../../security/password-encrypter";
import { CreateUserService } from "../services/create-user.service";

const userRepository = UserRepositoryPrisma.create(prismaClient);
const passwordCrypter = PasswordEncrypter.create();
const userCreateService = CreateUserService.create(userRepository, passwordCrypter);
const userControllerRegister = UserRegisterController.create(userCreateService);

export { userControllerRegister };