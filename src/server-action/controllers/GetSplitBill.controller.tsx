import { getSplitBill } from "../services/getSplitBill.service";
import { NextResponse } from "next/server";
export const getAllItemSplitBill = async (groupId: number, userId: number) => {
  try {
    const getItem = await getSplitBill({ groupId, userId });
    return NextResponse.json(
      {
        success: true,
        message: "Success get all Item SplitBills",
        data: getItem,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error get all item SplitBills:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
};
