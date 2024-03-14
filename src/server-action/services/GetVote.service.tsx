import { details, detailMember } from "../repository/getvote.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { Membergroup } from "../types/voteGift.types";
import { memberGroup } from "../repository/votegift";

const getVoteGift = async ({ groupId }: Membergroup) => {
  try {
    const detailsGift = await details({ groupId });
    const membersByGift = await detailMember({ groupId });
    const member = await memberGroup({ groupId });
    const formattedGifts = detailsGift.map((gift) => {
      const giftId = gift.getDataValue("gift_id") as number;
      return {
        ...gift.toJSON(),
        total_member: member,
        user: membersByGift[giftId] || [],
      };
    });

    return {
      status: 200,
      message: "Successfully get vote Gift",
      data: {
        Gift: formattedGifts,
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
