import { NextResponse } from "next/server";
import { Findgroup } from "../services/Findgroup.service";
export const findGroup = async (name: string, groupId: number) => {
  try {
    console.log(name,groupId)
    const findingGroup = await Findgroup({ name }, { groupId });
    return NextResponse.json(
      {
        success: true,
        message: "Success Finding username",
        data: findingGroup,
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
};
