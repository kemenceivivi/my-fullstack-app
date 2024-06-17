import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = `${process.env.SECRET_KEY}`;

export const saltRounds = 10;

export function generateAccessToken(userId: string, username: string): string {
    return jwt.sign({ userId, username }, SECRET_KEY, { expiresIn: "1h" });
}

export async function generateHash(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error generating hash:', error);
        throw error;
    }
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}