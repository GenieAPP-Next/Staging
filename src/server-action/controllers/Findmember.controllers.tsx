import { NextRequest, NextResponse } from "next/server";
import { validationResult } from "express-validator";
import { searchUserNameService } from "../services/Findusername.service";
export const Findmember = async (
  req: NextRequest,
  res: NextResponse,
) => {
  if (req.method === "GET") {
    try {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return NextResponse.json(
          {
            message: errors.array(),
          },
          { status: 400 }
        );
      }

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
      console.error("Error finding username:", error);
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: `Method ${req.method} is invalid`,
      },
      { status: 500 }
    );
  }
};
