import { NextRequest, NextResponse } from "next/server";
import { addUsernameService } from "../services/Addusername.service";
export const Addmember = async (
  req: NextRequest,
  res: NextResponse,
) => {
  if (req.method === "POST") {
    const body = await req.json();
    try {
      const { groupId, userId, role } = body;
      const addMemberGroup = await addUsernameService({
        groupId,
        userId,
        role,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Success Add username",
          data: addMemberGroup,
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Error Add member:", err);
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
};
