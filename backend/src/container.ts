import AuthController from "./controllers/auth.controller.js";
import ProductController from "./controllers/product.controller.js";
import AuthRepository from "./repository/auth.repository.js";
import ProductRepository from "./repository/product.repository.js";
import AuthService from "./service/auth.service.js";
import ProductService from "./service/product.service.js";



const authRepository = new AuthRepository();
const productRepository = new ProductRepository();

const authService = new AuthService(authRepository);
const productService = new ProductService(productRepository, authRepository);

const authController = new AuthController(authService);
const productController = new ProductController(productService);

export const container = {
	authController,
	productController,
};