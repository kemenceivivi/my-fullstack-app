import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/db";

export const pokemonController = {
    async catchPokemon(req: Request, res: Response, next: NextFunction) {
        try {
            const { pokemonId } = req.body;
            const user = (req as any).user;
            if (!user) {
                return res.sendStatus(401);
            }
            const userId = user.userId;

            if (!userId) {
                return res.status(400).json({ message: "auser ID not found in token" });
            }

            const caughtPokemon = await prisma.caughtPokemon.create({
                data: {
                    userId,
                    pokemonId,
                },
            });

            res.status(200).json(caughtPokemon);
        } catch (error) {
            console.error("Catch pokemon error:", error);
            next(error);
        }
    },

    async releasePokemon(req: Request, res: Response, next: NextFunction) {
        try {
            const { pokemonId } = req.body;
            const user = (req as any).user;
            if (!user) {
                return res.sendStatus(401);
            }
            const userId = user.userId;

            if (!userId) {
                return res.status(400).json({ message: "user ID not found in token" });
            }

            await prisma.caughtPokemon.delete({
                where: {
                    userId_pokemonId: {
                        userId,
                        pokemonId,
                    },
                },
            });

            res.status(200).json({ message: "Pokemon released successfully" });
        } catch (error) {
            console.error("Release Pokemon error:", error);
            next(error);
        }
    },

    async listCaughtPokemons(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            if (!user) {
                return res.sendStatus(401);
            }
            const userId = user.userId;

            if (!userId) {
                return res.status(400).json({ message: "user ID not found in token" });
            }

            const caughtPokemons = await prisma.caughtPokemon.findMany({
                where: { userId },
                include: {
                    user: true,
                },
            });

            res.status(200).json(caughtPokemons);
        } catch (error) {
            console.error("List Caught Pokemons error:", error);
            next(error);
        }
    },
};
