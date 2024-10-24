import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { ErrorMiddleware } from "./middleware/error.middleware";
import { userRouter } from "./routers/router-user";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*" }));

app.use("/users", userRouter);

app.use(ErrorMiddleware);

export { app };
