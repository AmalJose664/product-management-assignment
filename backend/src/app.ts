import express from "express";
import connectDB from "./config/mongo.config.js";
import { createServer } from "http";
import baseRouter from "./routes/base.routes.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import cors from "cors";
import { corsOptions } from "./config/cors.config.js";

const app = express();
const httpServer = createServer(app);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.use("/", baseRouter);
app.use("/api", apiRouter)


app.use(errorHandler);


connectDB();
export default httpServer;