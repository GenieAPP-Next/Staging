import BillSplits from "@/models/BillSplits.model";
import GroupMembers from "@/models/GroupMember.model";
import Gifts from "@/models/Gifts.model";
import { splitBill, postSplitBill } from "../types/splitBill.type";
import Bills from "@/models/Bills.model";

const SplitBill = async ({ groupId }: splitBill) => {
  try {
    const member = await GroupMembers.count({
      where: { group_id: groupId },
    });
    const priceGift = await Gifts.findOne({
      where: {
        group_id: groupId,
      },
      attributes: ["price"],
    });
    const totalAmountGift = priceGift?.getDataValue("price") as number;
    const splitBillAmount = totalAmountGift / member;
    return splitBillAmount;
  } catch (error) {
    console.error("Error splitting bill:", error);
    throw error;
  }
};

export const PostSplitBill = async ({ giftId, groupId }: postSplitBill) => {
  try {
    // const findGiftId = await Gifts.findOne({
    //   where: {
    //     group_id: groupId,
    //   },
    //   attributes: ["gift_id"],
    // });

    // const giftId = findGiftId?.getDataValue("gift_id") as number;

    const findBillId = await Bills.findOne({
      where: {
        gift_id: giftId,
      },
      attributes: ["bill_id"],
    });

    const findUserIds = await GroupMembers.findAll({
      where: {
        group_id: groupId,
      },
      attributes: ["user_id"],
    });

    const status = "Pending / Awaiting Payment";

    const promises = findUserIds.map(async (user) => {
      const billId = findBillId?.getDataValue("bill_id") as number;

      const postBill = await BillSplits.create({
        bill_id: billId,
        user_id: user.get("user_id"),
        amount: await SplitBill({ groupId }),
        status,
        group_id: groupId,
      });

      return postBill;
    });

    const postBillResults = await Promise.all(promises);

    return postBillResults;
  } catch (error) {
    console.error("Error posting split bill:", error);
    throw error;
  }
};
