import { Router } from "express";

import { routeAdapter } from "../adapters/route-adapter";
import { userControllerRegister } from "../../../resources/user/factores/user-factor-register";


const userRouter = Router();

userRouter.post("/register", routeAdapter(userControllerRegister));

export { userRouter };