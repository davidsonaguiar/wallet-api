import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../../security/token-service";
import { FindUserByEmailService } from "../../../resources/user/services/find-user-by-email.service";

export class AuthMiddleware {
    private constructor(
        private readonly tokenService: TokenService,
        private readonly findUserService: FindUserByEmailService
    ) {}

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.headers["authorization"];
            if (!authorization) res.status(401).json({ message: "Unauthorized" }).send();

            const token = authorization?.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const email = await this.tokenService.verify(token);

            const user = this.findUserService.execute(email);
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            res.locals.userEmail = email;

            next();
        } catch (err) {
            next(err);
        }
    }
}
