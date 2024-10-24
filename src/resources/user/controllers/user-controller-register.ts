import { HttpRequest, HttpResponse, IController } from "../../../common/protocols/controller";
import { UserDtoRegister } from "../dtos/user-dto-register";
import { UserCreateService } from "../services/user-service-create";

export class UserControllerRegister implements IController {
    private constructor(private readonly userCreateService: UserCreateService) {}

    public static create(userCreateService: UserCreateService): UserControllerRegister {
        return new UserControllerRegister(userCreateService);
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        const { name, email, password } = req.body;
        const userDto = new UserDtoRegister(name, email, password);
        const user = userDto.validate();
        const responseBody = await this.userCreateService.execute(user);

        return {
            status: 201,
            body: responseBody,
        };
    }
}
