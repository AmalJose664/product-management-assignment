import z from "zod";


export const UserSchema = z.object({
	name: z.string().max(30).min(3),
	email: z.email(),
	password: z.string().min(8).max(64).regex(/\d/, "Password must contain at least one number")
});




export type UserDTO = z.infer<typeof UserSchema>;
