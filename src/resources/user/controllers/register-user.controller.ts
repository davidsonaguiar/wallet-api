import {
    HttpRequest,
    HttpResponse,
    IController,
} from "../../../common/protocols/controller.protocol";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { CreateUserService } from "../services/create-user.service";

export class RegisterUserController implements IController {
    private constructor(private readonly userCreateService: CreateUserService) {}

    public static create(userCreateService: CreateUserService): RegisterUserController {
        return new RegisterUserController(userCreateService);
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        const { name, email, password } = req.body;
        const userDto = new RegisterUserDto(name, email, password);
        const user = userDto.validate();
        const responseBody = await this.userCreateService.execute(user);

        return {
            status: 201,
            body: responseBody,
        };
    }
}
