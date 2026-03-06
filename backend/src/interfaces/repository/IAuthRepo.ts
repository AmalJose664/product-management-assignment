
import { IUser, } from "@/models/User.js"

export interface IAuthRepository {
	createUser(userData: Partial<IUser>): Promise<IUser>
	findUser(id: string): Promise<IUser | null>
	findUserByEmail(email: string, includePass?: boolean): Promise<IUser | null>
	updateUser(id: string, newData: Partial<IUser>): Promise<IUser | null>
}