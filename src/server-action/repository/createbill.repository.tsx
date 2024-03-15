import Bills from "@/models/Bills.model";
// import BillSplits from "@/models/BillSplits.model";
import { createBill } from "../types/createBill.type";
import Gifts from "@/models/Gifts.model";

export const Createbill = async ({ giftId, groupId }: createBill) => {
    try{
        const findPriceandGiftId = await Gifts.findOne({
            where:{
                group_id: groupId,
                gift_id: giftId
            },
            attributes: ["price"]
        })
        const totalAmountGift = findPriceandGiftId?.getDataValue("price") as number;
        console.log(totalAmountGift)
        // const giftId = findPriceandGiftId?.getDataValue("gift_id") as number;
        const status = 'Pending / Awaiting Payment'
      const createBill = await Bills.create({
        gift_id: giftId,
        total_amount: totalAmountGift,
        status,
      });
      return createBill
    } catch (err) {
        console.error("Error Create bill:", err);
        throw err;
      }
};
