import {
    HttpRequest,
    HttpResponse,
    IController,
} from "../../../common/protocols/controller";
import { UserRegisterDto } from "../dtos/user-register.dto";
import { CreateUserService } from "../services/create-user.service";

export class UserRegisterController implements IController {
    private constructor(
        private readonly userCreateService: CreateUserService
    ) {}

    public static create(
        userCreateService: CreateUserService
    ): UserRegisterController {
        return new UserRegisterController(userCreateService);
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        const { name, email, password } = req.body;
        const userDto = new UserRegisterDto(name, email, password);
        const user = userDto.validate();
        const responseBody = await this.userCreateService.execute(user);

        return {
            status: 201,
            body: responseBody,
        };
    }
}
