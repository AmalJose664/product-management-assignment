import express from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.routes.js";

export const apiRouter = express.Router();
apiRouter.use((req, res, next) => {
	console.log(req.path)
	next()
})
apiRouter.use("/auth", authRouter);
apiRouter.use("/product", productRouter);
