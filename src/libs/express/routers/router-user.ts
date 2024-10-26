import { Router } from "express";

import { routeAdapter } from "../adapters/route-adapter";
import { registerUserController } from "../../../resources/user/factores/register-user.factor";
import {loginUserController} from "../../../resources/user/factores/login-user.factor";


const userRouter = Router();

userRouter.post("/register", routeAdapter(registerUserController));
userRouter.post("/login", routeAdapter(loginUserController));

export { userRouter };