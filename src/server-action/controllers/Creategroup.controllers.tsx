import { NextRequest, NextResponse } from "next/server";
import { validationResult } from "express-validator";
import { createGroup } from "../DAO/creategroup";
export const Creategroup = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const body = await req.json();
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
      const { name, category, eventDate, creatorUserId } = body;
      const newGroup = await createGroup({ name, category, eventDate, creatorUserId });
      return NextResponse.json(
        {
          success: true,
          message: "Create Group successfully",
          data: newGroup,
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Error create group:", err);
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
