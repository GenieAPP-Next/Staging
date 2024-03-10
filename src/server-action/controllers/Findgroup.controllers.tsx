import { NextResponse } from "next/server";
import { Findgroup } from "../services/Findgroup.service";
export const findGroup = async (userId: number) => {
  try {
    console.log(userId)
    const findingGroup = await Findgroup({ userId });
    return NextResponse.json(
      {
        success: true,
        message: "Success Finding group",
        data: findingGroup,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error finding group:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
};
