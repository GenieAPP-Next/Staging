// Addmember.controllers.ts
import { NextRequest, NextResponse } from "next/server";
import { validationResult } from "express-validator";
import { Findusername } from "../DAO/findusername";
export const Addmember = async (
  req: NextRequest,
  res: NextResponse,
  username: string
) => {
  if(req.method === "GET"){

    try {
      // const body = await req.json()
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return NextResponse.json(
          {
            message: errors.array(),
          },
          { status: 400 }
        );
      }
      const existingMember = await Findusername({ username });
      if (!existingMember ) {
        return NextResponse.json(
          {
            success: false,
            message: "Username not found",
          },
          { status: 404 }
        );
      }
      console.log(existingMember);
      return NextResponse.json(
        {
          success: true,
          message: "User found successfully",
          data: existingMember,
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Error Get Member by Username:", err);
      return NextResponse.json(
        {
          success: false,
          message: err.message,
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
}
