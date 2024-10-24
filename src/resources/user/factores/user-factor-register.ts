import { UserControllerRegister } from './../controllers/user-controller-register';
import { prismaClient } from "../../../../prisma/prisma-client";
import { UserRepositoryPrisma } from "../../../../prisma/repositories/user-repository";
import { UserProviderPasswordEncrypter } from "../providers/user-provider-password-encrypter";
import { UserCreateService } from "../services/user-service-create";

const userRepository = UserRepositoryPrisma.create(prismaClient);
const passwordCrypter = UserProviderPasswordEncrypter.create();
const userCreateService = UserCreateService.create(userRepository, passwordCrypter);
const userControllerRegister = UserControllerRegister.create(userCreateService);

export { userControllerRegister };