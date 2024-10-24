import { Router } from "express";

import { routeAdapter } from "../adapters/route-adapter";
import { userControllerRegister } from "../../../resources/user/factores/user-register.factor";


const userRouter = Router();

userRouter.post("/register", routeAdapter(userControllerRegister));

export { userRouter };