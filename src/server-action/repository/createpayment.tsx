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
          billSplitId,
          paymentDate,
          amount,
          paymentMethod,
          confirmationStatus,
        });
        return payment;
    } catch(err){
        console.error("Error creating group:", err);
        throw err;
    }
};
