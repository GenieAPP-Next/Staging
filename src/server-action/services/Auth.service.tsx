import Users from "@/models/Users.model";
import ErrorHandler from "../utils/ErrorHandler";
import bcrypt from "bcrypt";
import { RegisterInput } from "../types/Auth.types";
import { getUserEmail } from "../repository/Auth.repository";

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
      message: "registraion successful",
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

export { registerService };
