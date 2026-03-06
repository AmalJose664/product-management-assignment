import { COMMON_ERRORS } from "@/constants/errors.js";
import { STATUS_CODES } from "@/constants/statusCodes.js";
import { UserDTO, UserSchema } from "@/dtos/user.dto.js";
import { IAuthController } from "@/interfaces/controllers/IAuthController.js"
import { IAuthSvc } from "@/interfaces/services/IAuthSvc.js"
import AppError from "@/utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "@/utils/generateToken.js";
import { printZodError } from "@/utils/zodUtils.js";
import { NextFunction, Request, Response } from "express";



class AuthController implements IAuthController {
	private authService: IAuthSvc
	constructor(authSvc: IAuthSvc) {
		this.authService = authSvc
	}

	async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newUserData = req.body
			const validatedResult = UserSchema.safeParse(newUserData)

			if (validatedResult.error || !validatedResult.success) {
				const errorStrings = printZodError(validatedResult)
				throw new AppError(COMMON_ERRORS.VALIDATION_ERRORS(errorStrings, "Auth"), STATUS_CODES.BAD_REQUEST)
			}

			const data = validatedResult.data as UserDTO
			const newUser = await this.authService.newSignup(data)


			const accessToken = generateAccessToken({ id: newUser._id.toString(), role: newUser.role })
			const refreshToken = generateRefreshToken({ id: newUser._id.toString(), role: newUser.role })
			const response = {
				user: {
					name: newUser.name,
					email: newUser.email,
					role: newUser.role,
					_id: newUser._id.toString()
				},
				tokens: {
					accessToken,
					refreshToken
				}
			}

			res.status(STATUS_CODES.OK).json(response)
		} catch (error) {
			next(error)
		}

	}
	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const formData = req.body
			const { email, password } = formData
			const newUser = await this.authService.loginUser(email, password)

			const accessToken = generateAccessToken({ id: newUser._id.toString(), role: newUser.role })
			const refreshToken = generateRefreshToken({ id: newUser._id.toString(), role: newUser.role })
			const response = {
				user: {
					name: newUser.name,
					email: newUser.email,
					role: newUser.role,
					_id: newUser._id.toString()
				},
				tokens: {
					accessToken,
					refreshToken
				}
			}

			res.status(STATUS_CODES.OK).json(response)

		} catch (error) {
			next(error)
		}
	}

	async getAuthenticatedUser(req: Request, res: Response, next: NextFunction): Promise<void> {

		try {
			const user = req.user
			const userFromDb = await this.authService.findAuthenticatedUser(user.id)
			if (!userFromDb) {
				throw new AppError(COMMON_ERRORS.NOT_FOUND, STATUS_CODES.NOT_FOUND)
			}

			const response = {
				user: {
					name: userFromDb.name,
					email: userFromDb.email,
					role: userFromDb.role,
					_id: userFromDb._id.toString()
				}
			}
			res.status(STATUS_CODES.OK).json(response)
		} catch (error) {
			next(error)
		}
	}

	checkAuth(req: Request, res: Response, next: NextFunction): void {
		res.json({ message: "ok", user: req.user })
	}
}

export default AuthController