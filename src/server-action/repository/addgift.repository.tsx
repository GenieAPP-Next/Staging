import Gifts from "@/models/Gifts.model";
import Votes from "@/models/Votes.model";
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
    // Create a new gift entry
    const gift = await Gifts.create({
      group_id: groupId,
      name,
      price,
      image_url: imageUrl,
      url_link: urlLink || "",
      user_id: userId,
      category_id: categoryId,
    });

    // Create a new entry in the Votes table
    await Votes.create({
      gift_id: gift.getDataValue("gift_id"),
      user_id: userId,
    });

    // Return the new gift record
    return gift;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error processing gift:", errorMessage);
    throw new Error(errorMessage);
  }
};
