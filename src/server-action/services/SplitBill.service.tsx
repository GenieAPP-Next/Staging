import { PostSplitBill } from "../repository/splitbill.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { postSplitBill } from "../types/splitBill.type";
const SplitBill = async ({ giftId, groupId }: postSplitBill) => {
  try {
    const postBill = await PostSplitBill({ giftId, groupId });
    return {
      status: 200,
      message: "Sucess post Split Bill",
      data: postBill,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { SplitBill };
