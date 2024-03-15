import Gifts from "@/models/Gifts.model";
import {
  addGift,
  addGiftbyCategory,
  checkingGift,
} from "../types/addGift.types";
export const Addgift = async ({
  groupId,
  name,
  price,
  imageUrl,
  urlLink,
  userId,
  categoryId,
}: addGift) => {
  try {
    const createGift = await Gifts.create({
      group_id: groupId,
      name,
      price,
      image_url: imageUrl,
      url_link: urlLink,
      user_id: userId,
      category_id: categoryId,
    });

    return createGift;
  } catch (err) {
    console.error("Error add gift:", err);
    throw err;
  }
};
export const AddGiftbycategory = async ({
  giftId,
  categoryId,
}: addGiftbyCategory) => {
  try {
    const addGift = await Gifts.findOne({
      where: {
        gift_id: giftId,
        category_id: categoryId,
      },
    });

    return addGift;
  } catch (err) {
    console.error("Error add gift by category:", err);
    throw err;
  }
};
export const checkGift = async ({ groupId, userId }: checkingGift) => {
  try {
    const checkingGift = await Gifts.findOne({
      where: {
        group_id: groupId,
        user_id: userId,
      },
    });
    return checkingGift;
  } catch (err) {
    console.error("Error Checking Gift:", err);
    throw err;
  }
};
