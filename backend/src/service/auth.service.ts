import { COMMON_ERRORS } from "@/constants/errors.js"
import { STATUS_CODES } from "@/constants/statusCodes.js"
import { UserDTO } from "@/dtos/user.dto.js"
import { IAuthRepository } from "@/interfaces/repository/IAuthRepo.js"
import { IAuthSvc } from "@/interfaces/services/IAuthSvc.js"
import { IUser } from "@/models/User.js"
import AppError from "@/utils/AppError.js"
import { compare, hash } from "bcrypt"


class AuthService implements IAuthSvc {
	private authRepo: IAuthRepository
	constructor(repo: IAuthRepository) {
		this.authRepo = repo
	}
	async newSignup(newUserData: UserDTO): Promise<IUser> {
		const existingUser = await this.authRepo.findUserByEmail(newUserData.email)
		if (existingUser) {
			throw new AppError("Email already exists", STATUS_CODES.CONFLICT)
		}
		const hashedPassword = await hash(newUserData.password, 10)
		const savedUser = await this.authRepo.createUser({
			email: newUserData.email,
			password: hashedPassword,
			name: newUserData.name,
		})
		return savedUser

	}
	async loginUser(email: string, password: string): Promise<IUser> {
		const user = await this.authRepo.findUserByEmail(email, true)
		if (!user) {
			throw new AppError("Invalid email or password", STATUS_CODES.UNAUTHORIZED)
		}
		const passMatch = await compare(password, user.password)
		if (!passMatch) {
			throw new AppError("Invalid email or password", STATUS_CODES.UNAUTHORIZED)
		}
		return user
	}

	async findAuthenticatedUser(id: string): Promise<IUser | null> {
		return await this.authRepo.findUser(id)
	}

}

export default AuthService