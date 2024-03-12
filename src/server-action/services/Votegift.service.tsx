import { Votegift, Membergroup as inputGroupId } from "../types/voteGift.types";
import {
  voteGift as voting,
  totalVote,
  memberGroup,
} from "../repository/votegift";
import ErrorHandler from "../utils/ErrorHandler";
const voteGift = async (
  { giftId, userId }: Votegift,
  { groupId }: inputGroupId
) => {
  try {
    const Count = await totalVote({ giftId });
    const member = await memberGroup({ groupId });
    if (Count < member) {
      const addVote = await voting({ userId, giftId });
      const countingVote = await totalVote({ giftId });
      return {
        status: 200,
        message: "Sucessfuly voting Gift",
        data: {
          Total_vote: countingVote,
          vote: addVote,
        },
      };
    }
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { voteGift };
