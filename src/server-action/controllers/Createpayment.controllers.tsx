import { Payments } from "../services/Payment.service";
// import { paymentInput } from "../types/payment.types";
import { NextRequest, NextResponse } from "next/server";

export const Createpayment = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const {
        billSplitId,
        amount,
        paymentMethod,
        confirmationStatus,
      } = body;
      const paymentDate: Date =  new Date();
      const paymentSplitBill = await Payments({
        billSplitId,
        paymentDate,
        amount,
        paymentMethod,
        confirmationStatus,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Create Group successfully",
          data: paymentSplitBill,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error Crate Payment:", error);
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
