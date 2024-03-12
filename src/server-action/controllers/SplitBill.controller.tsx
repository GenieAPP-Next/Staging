import { NextResponse } from "next/server";
import { Createbill as Bill } from "../services/Createbill.service";
import { SplitBill as Split } from "../services/SplitBill.service";
export const splitBill = async (groupId: number) => {
  try {
    const createBill = await Bill({ groupId });
    const SplitBill = await Split({ groupId });
    return NextResponse.json(
      {
        success: true,
        message: "Success Split bill",
        data: {
          createbill: createBill,
          splitBill: SplitBill,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error Split bill:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
};
