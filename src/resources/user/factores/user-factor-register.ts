import { UserControllerRegister } from './../controllers/user-controller-register';
import { prismaClient } from "../../../libs/prisma/prisma-client";
import { UserRepositoryPrisma } from "../../../libs/prisma/repositories/user-repository";
import { UserProviderPasswordEncrypter } from "../../../security/security-password-encrypter";
import { UserServiceCreate } from "../services/user-service-create";
import { SecurityTokenService } from '../../../security/security-token-service';

const userRepository = UserRepositoryPrisma.create(prismaClient);
const passwordCrypter = UserProviderPasswordEncrypter.create();
const userCreateService = UserServiceCreate.create(userRepository, passwordCrypter);
const userControllerRegister = UserControllerRegister.create(userCreateService);

export { userControllerRegister };