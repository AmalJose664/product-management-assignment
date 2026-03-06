import { UserDTO } from "@/dtos/user.dto.js"
import { IUser } from "@/models/User.js"

export interface IAuthSvc {
	loginUser(email: string, password: string): Promise<IUser>
	newSignup(newUserData: UserDTO): Promise<IUser>
	findAuthenticatedUser(id: string): Promise<IUser | null>
}