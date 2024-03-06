import { NextResponse } from "next/server";
import { showlistmember } from "../services/Showlistuser.service";
export const listMember = async (id: number) => {
  try {
    const showListMember = await showlistmember({ groupId: id });
    return NextResponse.json(
      {
        success: true,
        message: "Success Show List Member",
        data: showListMember,
      },
      { status: 200 }
    );
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
};
