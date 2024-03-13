import {
  getGift,
  getSplitBillbyuserId,
  getBill as Bills,
} from "../repository/getSplitbills.repository";
import { getSplitBills } from "../types/getSplitBill.type";
import ErrorHandler from "../utils/ErrorHandler";
const getSplitBill = async ({ groupId, userId }: getSplitBills) => {
    try{
      const getGiftItem = await getGift({ groupId });
      const getBill = await Bills({ groupId });
      const getSplitBill = await getSplitBillbyuserId({ groupId, userId });
      return {
        status: 200,
        message: "Successfully get all item Split bill",
        data: {
          Gift: getGiftItem,
          Bill: getBill,
          SplitBills: getSplitBill,
        },
      };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { getSplitBill };