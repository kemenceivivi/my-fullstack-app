
import {LoginRequest, RegisterRequest} from "../models/models";
import {prisma} from "../db/db";
import {comparePasswords, generateHash} from "./authService";

export const registerService = {
    async registerUser(register: RegisterRequest): Promise<any> {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: register.email,
            },
        });

        if (existingUser?.email) {
            return Promise.reject({
                message: "This e-mail is already in use!",
                status: 401,
            });
        }

        const hashedPassword = await generateHash(register.password);

        return prisma.user.create({
            data: {
                email: register.email,
                username: register.username,
                password: hashedPassword,
            },
        });
    },
};

export const loginService = {
    async loginUser(login: LoginRequest): Promise<any> {
        const user = await prisma.user.findFirst({ where: { email: login.email } });
        if (!user) {
            throw new Error("Invalid email!");
        }

        const passwordIsValid = await comparePasswords(login.password, user.password);

        if (!passwordIsValid) {
            throw new Error("Invalid password!");
        }

        return user;
    },
};



