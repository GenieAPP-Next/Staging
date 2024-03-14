import Gifts from "@/models/Gifts.model";
import { addGift } from "../types/addGift.types";
import Votes from "@/models/Votes.model";

// Fungsi untuk menambahkan gift baru atau sebagai rekomendasi
export const Addgift = async ({
  groupId,
  name,
  price,
  imageUrl,
  urlLink,
  userId,
  categoryId,
  isRecommendation = false,
  recommendedGroupId,
}: addGift & { isRecommendation?: boolean; recommendedGroupId?: number }) => {
  try {
    // If the gift is a recommendation, handle it accordingly
    if (isRecommendation && recommendedGroupId) {
      // Find the existing gift with the provided criteria
      const existingGift = await Gifts.findOne({
        where: {
          name,
          price,
          image_url: imageUrl,
          user_id: userId,
          category_id: categoryId,
        },
      });

      // If the existing gift is not found, throw an error
      if (!existingGift) {
        throw new Error("Recommended gift not found.");
      }

      // Get the gift ID using getDataValue()
      const giftId = existingGift.getDataValue("gift_id");

      // Add an entry to the votes table for the recommended gift
      const vote = await Votes.create({
        gift_id: giftId,
        user_id: userId,
        // Use the recommendedGroupId for the vote record
        group_id: recommendedGroupId,
      });

      // Return the new vote record
      return vote;
    } else {
      // For new gifts, ensure urlLink is provided
      if (!urlLink) {
        throw new Error("URL link is required for new gifts.");
      }

      // Create a new gift with all the provided details
      const gift = await Gifts.create({
        group_id: groupId,
        name,
        price,
        image_url: imageUrl,
        url_link: urlLink,
        user_id: userId,
        category_id: categoryId,
      });

      await Votes.create({
        gift_id: gift.getDataValue("gift_id"),
        group_id: groupId,
        user_id: userId,
      });

      // Return the new gift record
      return gift;
    }
  } catch (err) {
    console.error("Error processing gift:", err);
    throw err;
  }
};
