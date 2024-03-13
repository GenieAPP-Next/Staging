import { Findusername } from "../repository/findusername";
import ErrorHandler from "../utils/ErrorHandler";
import { Findmember } from "../types/findMember.types";
const searchUserNameService = async ({ username }: Findmember) => {
  try {
    const findusername = await Findusername({ username });
    if (!findusername) {
      throw new ErrorHandler({
        success: false,
        status: 400,
        message: "username not found",
      });
    }
    return {
        status: 200,
        message: "Success find username",
        data: findusername
    }

  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { searchUserNameService };
