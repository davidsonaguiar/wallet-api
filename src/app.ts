import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { errorHandler } from "./error/error-handler";

import { userRouter } from "./resources/user/user-routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*" }));

app.use("/users", userRouter);

app.use(errorHandler);

export { app };
