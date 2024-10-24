import { NextFunction, Request, Response } from "express";
import { ErrorStandard } from "./error-standard";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ErrorStandard) {
        res.status(err.getStatus()).json({ message: err.message });
    } else {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
