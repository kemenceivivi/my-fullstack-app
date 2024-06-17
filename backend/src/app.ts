import express from "express";
import rootRouter from "./routes";
import cors from "cors";
import jsonErrorHandler from "./middleware/error.handler";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);

app.use(jsonErrorHandler);

export default app;
