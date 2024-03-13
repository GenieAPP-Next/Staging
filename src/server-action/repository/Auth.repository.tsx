import Users from "@/models/Users.model";
import { Model } from "sequelize";

export const getUserEmail = async (email: string) => {
	const existEmail = await Users.findOne({
		where: { email },
	});

	return existEmail;
};

interface UserAttributes {
	email: string;
	username: string;
	password_hash: string;
	role: string;
}

export const getUserAccount = async (
	inputEmail: string
): Promise<Model<UserAttributes, any> | null> => {
	const user = await Users.findOne({ where: { email: inputEmail } });
	return user;
};
