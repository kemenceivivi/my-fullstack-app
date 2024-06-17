import { Request, Response, NextFunction } from 'express';
import { ApiErrorModel, ApiErrorResModel } from "../models/models";

export default function jsonErrorHandler(
    err: ApiErrorModel,
    req: Request,
    res: Response<ApiErrorResModel>,
    _next: NextFunction
) {
    console.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
        } - ${req.ip}`
    );
    res.status(err.status || 500);
    res.json({
        message:
            req.app.get('env') === 'development'
                ? err.message
                : 'Unknown error happened',
    });
}