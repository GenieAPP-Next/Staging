import { NextResponse } from "next/server";
import { searchUserNameService } from "../services/Findusername.service";
export const Findmember = async (usernameInput: string) => {
  try {
    const findUsername = await searchUserNameService({
      username: usernameInput,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Success Finding username",
        data: findUsername,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error finding member:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
};
