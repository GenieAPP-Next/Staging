import Votes from "@/models/Votes.model";
import Gifts from "@/models/Gifts.model";
import GroupMembers from "@/models/GroupMember.model";
import {
  Membergroup,
  Detailgroup,
} from "../types/voteGift.types";
export const details = async ({ groupId }: Detailgroup) => {
  try {
    const detailGift = await Gifts.findAll({
      where: { group_id: groupId },
    });
    return detailGift;
  } catch (error) {
    console.error("Error detail gift:", error);
    throw error;
  }
};
export const memberGroup = async ({ groupId }: Membergroup) => {
  try {
    const member = await GroupMembers.count({
      where: { group_id: groupId },
    });
    return member;
  } catch (error) {
    console.error("Error count member:", error);
    throw error;
  }
};
export const detailMember = async ({ groupId }: Detailgroup) => {
    try {
      const giftIds = await Gifts.findAll({
        where: { group_id: groupId },
        attributes: ["gift_id"],
      });
  
      const userMapping: Record<number, number[]> = {};
  
      for (const gift of giftIds) {
        const votes = await Votes.findAll({
          where: { gift_id: gift.get("gift_id") },
          attributes: ["user_id"],
        });
  
        const userIds = votes.map((vote) => vote.get("user_id") as number);
        userMapping[gift.get("gift_id") as number] = userIds;
      }
  
      return userMapping;
    } catch (error) {
      console.error("Error grouping user_id by gift:", error);
      throw error;
    }
  };
  