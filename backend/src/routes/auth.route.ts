import { container } from "@/container.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { Router } from "express";


const authRouter = Router();

const { authController } = container
authRouter.post("/login", authController.login.bind(authController))
authRouter.post("/signup", authController.signup.bind(authController))
authRouter.get("/me", authMiddleware, authController.getAuthenticatedUser.bind(authController))
authRouter.get("/verify", authMiddleware, authController.checkAuth.bind(authController))

export default authRouter;