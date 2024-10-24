import { NextFunction, Request, Response } from "express";
import { StandardError } from "../../../common/error/standard-error";

export function ErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof StandardError) {
        res.status(err.getStatus()).json({ message: err.message });
    } else {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
