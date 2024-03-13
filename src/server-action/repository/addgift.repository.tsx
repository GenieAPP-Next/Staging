import Gifts from "@/models/Gifts.model";
import { addGift } from "../types/addGift.types";
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
    console.error("Error add category:", err);
    throw err;
  }
};
