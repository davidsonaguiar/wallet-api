import zod from "zod";
import { StandardError } from "../../../common/error/standard-error";
import {IDto} from "../../../common/protocols/dto.protocol";

export const UserRegisterSchema = zod.object({
    name: zod.string().min(3).max(255).trim(),
    email: zod.string().email().trim(),
    password: zod.string().min(6),
});

export type UserRegisterDtoType = zod.infer<typeof UserRegisterSchema>;

export class RegisterUserDto {
    constructor(
        private readonly name: string,
        private readonly email: string,
        private readonly password: string
    ) {}

    validate(): UserRegisterDtoType {
        const result = UserRegisterSchema.safeParse(this);
        if (!result.success) StandardError.badRequest(result.error.message);
        return {
            name: this.name,
            email: this.email,
            password: this.password,
        }
    }
}
