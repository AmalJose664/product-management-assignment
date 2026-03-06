import { Router } from "express";

const baseRouter = Router();
baseRouter.get("/", (_req, res) => {
	res.status(200).json({
		status: "ok",
	});
	return;
});

baseRouter.get('/health', (_req, res) => {
	res.status(200).json({
		success: true,
		message: 'API is healthy',
		timestamp: new Date().toISOString()
	});
});

export default baseRouter;
