import {Router} from "express";
import authRoutes from "./auth";
import pokemonRoutes from "./pokemon";

const rootRouter:Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/pokemon", pokemonRoutes);

export default rootRouter;