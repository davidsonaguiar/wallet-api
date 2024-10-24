import zod from "zod";
import { ErrorStandard } from "../../../error/error-standard";

export const UserDtoRegisterSchema = zod.object({
    name: zod.string().min(3).max(255).trim(),
    email: zod.string().email().trim(),
    password: zod.string().min(6),
});

export type UserDtoRegisterType = zod.infer<typeof UserDtoRegisterSchema>;

export class UserDtoRegister {
    constructor(
        private readonly name: string,
        private readonly email: string,
        private readonly password: string
    ) {}

    validate(): UserDtoRegisterType {
        const result = UserDtoRegisterSchema.safeParse(this);
        if (!result.success) ErrorStandard.badRequest(result.error.message);
        return {
            name: this.name,
            email: this.email,
            password: this.password,
        }
    }
}
