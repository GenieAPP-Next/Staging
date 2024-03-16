import Payments from "@/models/payments.model";
import { checkPayment, paymentInput } from "../types/payment.types";

export const Createpayment = async ({
  billSplitId,
  paymentDate,
  amount,
  paymentMethod,
  confirmationStatus,
}: paymentInput) => {
  try {
    const payment = await Payments.create({
      bill_split_id: billSplitId,
      payment_date: paymentDate,
      amount,
      payment_method: paymentMethod,
      confirmation_status: confirmationStatus,
    });
    return payment;
  } catch (err) {
    console.error("Error create payment:", err);
    throw err;
  }
};
export const checkpayment = async ({
  billSplitId,
  confirmationStatus,
}: checkPayment) => {
  try{
    const userpayment = await Payments.findOne({
      where: {
        bill_split_id: billSplitId,
        confirmation_status: confirmationStatus,
      },
    });
    return userpayment;
  } catch (err) {
    console.error("Error checking payment:", err);
    throw err;
  }
};
