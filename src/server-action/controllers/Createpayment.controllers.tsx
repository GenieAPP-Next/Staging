import { checkpayment } from "../repository/createpayment";
// import { updateBills as BillUpdate } from "../repository/updateBills.repository";
import { Payments } from "../services/Payment.service";
// import { paymentInput } from "../types/payment.types";
import { NextRequest, NextResponse } from "next/server";
import { UpdateBills } from "../services/updateBills.service";

export const Createpayment = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { billSplitId, userId, amount } = body;
      const paymentMethod = "Credit Card";
      const paymentDate: Date = new Date();
      const confirmationStatus = true;
      const checkuserpayment = await checkpayment({
        billSplitId,
        confirmationStatus,
      });
      if(checkuserpayment){
        return NextResponse.json(
          {
            success: true,
            message: "Thanks for payment",
          },
          { status: 200 }
        );
      }else{
        const paymentSplitBill = await Payments({
          billSplitId,
          paymentDate,
          amount,
          paymentMethod,
          confirmationStatus,
        });
        const UpdateSplitbillandBills = await UpdateBills({ userId, billSplitId });
        return NextResponse.json(
          {
            success: true,
            message: "Success Payment and update Bills",
            data: {
              create_payment: paymentSplitBill,
              update_bills: UpdateSplitbillandBills,
            },
          },
          { status: 200 }
        );
      }
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
