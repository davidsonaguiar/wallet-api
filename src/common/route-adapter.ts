import { NextFunction, Request, Response } from "express";
import { IController } from "./protocols/controller";

export function routeAdapter(controller: IController) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const httpResponse = await controller.handle(req);
            res.status(httpResponse.status).json(httpResponse.body);
        } catch (error) {
            next(error);
        }
    };
}
