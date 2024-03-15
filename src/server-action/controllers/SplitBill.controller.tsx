import { NextResponse } from "next/server";
import { Createbill as Bill } from "../services/Createbill.service";
import { SplitBill as Split } from "../services/SplitBill.service";
import { CheckGift } from "../repository/splitbill.repository";
export const splitBill = async (groupId: number, giftId: number) => {
  try {
    const checkgift = await CheckGift({ giftId });
    if (!checkgift) {
      return NextResponse.json(
        {
          success: false,
          message: "GiftId not found",
        },
        { status: 400 }
      );
    }
    else{
      const createBill = await Bill({ groupId, giftId });
      const SplitBill = await Split({ groupId, giftId });
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
    }
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
