import { Votegift } from "../types/voteGift.types";
import { voteGift as voting } from "../repository/votegift";
import ErrorHandler from "../utils/ErrorHandler";
const voteGift = async ({ giftId, userId }: Votegift) => {
  try {
    const votingGift = await voting({ giftId, userId });
    return {
      status: 200,
      message: "Sucessfuly voting Gift",
      data: votingGift,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { voteGift };
