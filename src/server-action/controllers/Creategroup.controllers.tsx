import { NextRequest, NextResponse } from "next/server";
import { createGroupService } from "../services/Creategroup.service";
import { Listmembergroup } from "../repository/showlistmember";
export const Creategroup = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const body = await req.json();
    try {
      const { name, category, eventDate, creatorUserId } = body;
      const newGroup = await createGroupService({
        name,
        category,
        eventDate,
        creatorUserId,
      });
      const groupId = newGroup.data.Id;
      const showListMember = await Listmembergroup({
        groupId,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Create Group successfully",
          data: {
            newGroup,
            members: showListMember,
          },
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
