import { getVoteGift } from "../services/GetVote.service";
import {  NextResponse } from "next/server";
export const Getvote = async (groupId: number) => {
  try {
    const getVote = await getVoteGift({ groupId });
    return NextResponse.json(
      {
        success: true,
        message: "Success Get Vote List",
        data: getVote,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
};
