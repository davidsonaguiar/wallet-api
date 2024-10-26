import {prismaClient} from "../../../libs/prisma/prisma-client";
import {UserRepositoryPrisma} from "../../../libs/prisma/repositories/user-repository";
import {PasswordEncrypter} from "../../../security/password-encrypter";
import { TokenService } from "../../../security/token-service";
import {CheckUserCredentialsService} from "../services/check-user-credentials.service";
import {LoginUserController} from "../controllers/login-user.controller";

const userRepository = UserRepositoryPrisma.create(prismaClient);
const passwordCrypter = PasswordEncrypter.create();
const tokenService = TokenService.create();

const checkUserCredentialsService = CheckUserCredentialsService.create(userRepository, passwordCrypter);
export const loginUserController = LoginUserController.create(checkUserCredentialsService, tokenService);

