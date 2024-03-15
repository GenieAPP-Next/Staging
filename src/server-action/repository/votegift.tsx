import Votes from "@/models/Votes.model";
import Gifts from "@/models/Gifts.model";
import GroupMembers from "@/models/GroupMember.model";
import {
  Votegift as voteInput,
  Countvote,
  Membergroup,
  Detailgroup,
  checkvotebyuserId,
  checkvote,
} from "../types/voteGift.types";
export const voteGift = async ({ userId, giftId }: voteInput) => {
  try {
    const addVote = await Votes.create({
      gift_id: giftId,
      user_id: userId,
    });
    return addVote;
  } catch (error) {
    console.error("Error add vote:", error);
    throw error;
  }
};
export const totalVote = async ({ giftId }: Countvote) => {
  try {
    const totalVote = await Votes.count({
      where: { gift_id: giftId },
    });
    return totalVote;
  } catch (error) {
    console.error("Error count vote:", error);
    throw error;
  }
};
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
export const detailMember = async ({ giftId }: checkvotebyuserId) => {
  try {
    const member = await Votes.findAll({
      where: { gift_id: giftId },
      attributes: ["user_id"],
    });
    return member;
  } catch (error) {
    console.error("Error count member:", error);
    throw error;
  }
};
export const checkVote = async ({ giftId, userId }: checkvote) => {
  try{
    const Check = await Votes.findOne({
      where:{
        gift_id: giftId,
        user_Id: userId
      }
    })
    return Check;
  } catch (error) {
    console.error("Error Checking Vote:", error);
    throw error;
  }
};
