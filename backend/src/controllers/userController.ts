import { NextFunction, Request, Response } from "express";
import {loginService, registerService} from "../services/userService";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../models/models";
import {generateAccessToken} from "../services/authService";

export const userController = {
    async register(
        req: Request<RegisterRequest>,
        res: Response<RegisterResponse>,
        next: NextFunction
    ) {
        try {
            const { email, username, password } = req.body;

            const newRegistration: RegisterRequest = { email, username, password };

            await registerService.registerUser(newRegistration);

            res.status(201).json({
                message: "Successfully registered",
                status: 201
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },

    async login(req: Request<LoginRequest>, res: Response<LoginResponse>, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await loginService.loginUser({email, password});
            const jwtToken = generateAccessToken(user.id, user.username);

            res.status(200).json({
                status: 200,
                token: jwtToken,
                username: user.username
            });
        } catch (error) {

            next(error);
        }
    }
};


