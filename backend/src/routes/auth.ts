import {Router} from "express";
import {userController} from "../controllers/userController";

const authRoutes: Router = Router();

authRoutes.post("/signup", userController.register);
authRoutes.post("/signin", userController.login);

authRoutes.get('/verify', userController.verify);

export default authRoutes;