import { NextFunction, Request, Response } from "express";
import {loginService, registerService} from "../services/userService";
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../models/models";
import {generateAccessToken} from "../services/authService";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = process.env.SECRET_KEY || 'default_secret_key';

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

    async login(req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse>, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await loginService.loginUser({ email, password });
            const jwtToken = generateAccessToken(user.id, user.username);

            res.cookie('token', jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'strict'
            });

            res.status(200).json({
                status: 200,
                username: user.username
            });
        } catch (error) {
            next(error);
        }
    },

    async verify(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.sendStatus(401);
            }
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log(decoded);
            res.status(200).json({
                status: 200,
                user: decoded
            });
        } catch (error) {
            console.error("Verification Error:", error);
            return res.sendStatus(403);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: 'Successfully logged out' });
    }
};


