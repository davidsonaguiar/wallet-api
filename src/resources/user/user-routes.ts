import { Router } from "express";
import { routeAdapter } from "../../common/route-adapter";
import { userControllerRegister } from "./factores/user-factor-register";

const userRouter = Router();

userRouter.post("/register", routeAdapter(userControllerRegister));

export { userRouter };