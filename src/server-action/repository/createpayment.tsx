import Payments from "@/models/payments.model";
import { paymentInput } from "../types/payment.types";

export const Createpayment = async ({
  billSplitId,
  paymentDate,
  amount,
  paymentMethod,
  confirmationStatus,
}: paymentInput) => {
    try{
        const payment = await Payments.create({
          bill_split_id: billSplitId,
          payment_date: paymentDate,
          amount,
          payment_method: paymentMethod,
          confirmation_status: confirmationStatus,
        });
        return payment;
    } catch(err){
        console.error("Error creating group:", err);
        throw err;
    }
};
