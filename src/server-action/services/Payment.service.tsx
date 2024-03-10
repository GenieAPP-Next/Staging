import { paymentInput } from "../types/payment.types";
import { Createpayment } from "../repository/createpayment";
import ErrorHandler from "../utils/ErrorHandler";
const Payments = async ({
  billSplitId,
  paymentDate,
  amount,
  paymentMethod,
  confirmationStatus,
}: paymentInput) => {
  try {
    const paymentCrt = await Createpayment({
      billSplitId,
      paymentDate,
      amount,
      paymentMethod,
      confirmationStatus,
    });
    return paymentCrt;
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { Payments };
