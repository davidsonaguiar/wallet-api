import zod from "zod";
import {StandardError} from "../../../common/error/standard-error";
import {IDto} from "../../../common/protocols/dto.protocol";

export const UserLoginSchema = zod.object({
    email: zod.string().email().trim(),
    password: zod.string().min(6),
});

export type UserLoginDtoType = zod.infer<typeof UserLoginSchema>;

export class LoginUserDto {
    constructor(
        private readonly email: string,
        private readonly password: string
    ) {}

    validate(): UserLoginDtoType {
        const result = UserLoginSchema.safeParse(this);
        if (!result.success) StandardError.badRequest(result.error.message);

        return {
            email: this.email,
            password: this.password,
        }
    }
}