import { voteGift } from "../services/Votegift.service";
import { CountVote } from "../services/Countvote.service";
import { NextRequest, NextResponse } from "next/server";
import GroupMembers from "@/models/GroupMember.model";
export const votingGift = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const body = await req.json();
    try {
      const { groupId, giftId, userId } = body;
      console.log(giftId, userId);
      const countingVote = await CountVote({ giftId });
      const memberGroup = await GroupMembers.count({
        where: {
          groupId,
        },
      });
      if (memberGroup >= countingVote) {
        const newVote = await voteGift({
          giftId,
          userId,
        });
        console.log(newVote);
        return NextResponse.json(
          {
            success: true,
            message: "Success vote gift",
            data: newVote,
          },
          { status: 200 }
        );
      }
    } catch (error: any) {
      console.error("Error create group:", error);
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
