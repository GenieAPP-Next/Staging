import Users from "@/models/Users.model";
import ErrorHandler from "../utils/ErrorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput } from "../types/Auth.types";
import { getUserAccount, getUserEmail } from "../repository/Auth.repository";

const registerService = async ({
	email,
	username,
	password,
}: RegisterInput) => {
	try {
		const existEmail = await getUserEmail(email);
		if (existEmail) {
			throw new ErrorHandler({
				success: false,
				status: 409,
				message:
					"The provided email is already registered. Please use a different email address.",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await Users.create({
			email,
			username,
			password_hash: hashedPassword,
		});
		return {
			status: 200,
			message: "registration successful",
			data: newUser,
		};
	} catch (error: any) {
		throw new ErrorHandler({
			success: false,
			status: error.status,
			message: error.message,
		});
	}
};

const loginService = async ({ email, password }: LoginInput) => {
	console.log(email, password);
	try {
		const user = await getUserAccount(email);
		console.log(user?.dataValues.password_hash);
		const JWT_SIGN = "310324";

		if (user) {
			const isPasswordCorrect: boolean = await bcrypt.compare(
				password,
				user?.dataValues.password_hash
			);

			if (isPasswordCorrect) {
				const accessToken: string = jwt.sign(
					{
						username: user.dataValues.username,
						role: user.dataValues.role,
					},
					JWT_SIGN,
					{ expiresIn: "1hr" }
				);

				const refreshToken: string = jwt.sign(
					{
						username: user.dataValues.username,
						role: user.dataValues.role,
					},
					JWT_SIGN,
					{ expiresIn: "7d" }
				);

				return {
					status: 200,
					message: "login successful",
					data: user,
					accessToken,
					refreshToken,
				};
			} else {
				return {
					status: 401,
					message: "Password is incorrect",
				};
			}
		} else {
			return {
				status: 401,
				message: "User Not Found",
			};
		}
	} catch (error: any) {
		throw new ErrorHandler({
			success: false,
			status: error.status || 500,
			message: error.message || "Internal Server Error",
		});
	}
};

export { registerService, loginService };