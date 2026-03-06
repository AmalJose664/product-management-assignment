import { IAuthRepository } from "@/interfaces/repository/IAuthRepo.js"
import { IUser, User } from "@/models/User.js"
import { Model } from "mongoose"

class AuthRepository implements IAuthRepository {
	private User: Model<IUser>
	constructor() {
		this.User = User
	}
	async createUser(userData: Partial<IUser>): Promise<IUser> {
		const newUser = new User(userData)
		await newUser.save()
		return newUser
	}

	async findUser(id: string): Promise<IUser | null> {
		return this.User.findById(id).select("-password")
	}

	async findUserByEmail(email: string, includePass?: boolean): Promise<IUser | null> {
		if (includePass) {
			return this.User.findOne({ email })
		}
		return this.User.findOne({ email }).select("-password")
	}

	async updateUser(id: string, newData: Partial<IUser>): Promise<IUser | null> {
		return this.User.findOneAndUpdate({ _id: id }, { ...newData })
	}
}

export default AuthRepository