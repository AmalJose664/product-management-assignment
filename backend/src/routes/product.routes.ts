import { container } from "@/container.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { checkRole } from "@/middlewares/roleBased.middleware.js";
import { RoleTypes } from "@/models/User.js";
import { Router } from "express";


const productRouter = Router();

const { productController } = container

productRouter.post("/", authMiddleware,
	checkRole(RoleTypes.ADMIN), productController.createProduct.bind(productController))

productRouter.get("/", authMiddleware, productController.getProducts.bind(productController))

productRouter.get("/:id", authMiddleware, productController.getProduct.bind(productController))

productRouter.put("/:id", authMiddleware,
	checkRole(RoleTypes.ADMIN), productController.updateProduct.bind(productController))

productRouter.delete("/:id", authMiddleware,
	checkRole(RoleTypes.ADMIN), productController.deleteProduct.bind(productController))

export default productRouter;