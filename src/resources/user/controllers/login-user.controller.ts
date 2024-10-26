import {HttpRequest, HttpResponse, IController} from "../../../common/protocols/controller.protocol";
import {CheckUserCredentialsService} from "../services/check-user-credentials.service";
import {ITokenService} from "../../../security/token-service";
import {LoginUserDto} from "../dtos/login-user.dto";

export class LoginUserController implements IController {
    private constructor(
       private readonly checkUserCredentialsService: CheckUserCredentialsService,
       private readonly tokenService: ITokenService
    ) {}

    public static create(checkUserCredentialsService: CheckUserCredentialsService, tokenService: ITokenService): LoginUserController {
        return new LoginUserController(checkUserCredentialsService, tokenService);
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        const {email, password} = req.body;
        const loginDto =  new LoginUserDto(email, password);
        const login = loginDto.validate();
        const isValid = await this.checkUserCredentialsService.execute(login);

        if(!isValid) {
            return {
                status: 401,
                body: {
                    message: 'Invalid email or password'
                }
            }
        }

        const token = this.tokenService.sign(email);
        return {
            status: 200,
            body: {
                token
            }
        }
    }
}