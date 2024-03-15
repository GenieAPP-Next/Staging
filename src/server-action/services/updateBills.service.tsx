import { updateBills } from "../repository/updateBills.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { updateBills as BillsUpdate } from "../types/payment.types";
const UpdateBills = async ({ userId, billSplitId }: BillsUpdate) => {
  try {
    const BillUpdate = await updateBills({ userId, billSplitId });
    return {
      status: 200,
      message: "Sucess update Bills",
      data: BillUpdate,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { UpdateBills };
