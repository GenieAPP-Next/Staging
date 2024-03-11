import { totalVote, detailMember, details } from "../repository/votegift";
import ErrorHandler from "../utils/ErrorHandler";
import { Countvote, Membergroup } from "../types/voteGift.types";

const getVoteGift = async ({ giftId }: Countvote, { groupId }: Membergroup) => {
  try {
    const countingVote = await totalVote({ giftId });
    const detailsGift = await details({ groupId });
    const Member = await detailMember({ giftId });
    return {
      status: 200,
      message: "Sucessfuly voting Gift",
      data: {
        Gift: detailsGift,
        Total_vote: countingVote,
        user: Member,
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
export { getVoteGift };
