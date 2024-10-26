import { RegisterUserController } from '../controllers/register-user.controller';
import { prismaClient } from "../../../libs/prisma/prisma-client";
import { UserRepositoryPrisma } from "../../../libs/prisma/repositories/user-repository";
import { PasswordEncrypter } from "../../../security/password-encrypter";
import { CreateUserService } from "../services/create-user.service";

const userRepository = UserRepositoryPrisma.create(prismaClient);
const passwordCrypter = PasswordEncrypter.create();
const userCreateService = CreateUserService.create(userRepository, passwordCrypter);

export const registerUserController = RegisterUserController.create(userCreateService);
