import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const db = {
    async checkConnection(): Promise<void> {
        await prisma.$connect().then(() => console.log("Successfully connected to the database"));
    },
};
