import { Addgift } from "../repository/addgift.repository";
import { addGift } from "../types/addGift.types";
import ErrorHandler from "../utils/ErrorHandler";

const Creategift = async ({
  groupId,
  name,
  price,
  imageUrl,
  urlLink,
  userId,
  categoryId,
  isRecommendation,
  recommendedGroupId,
}: addGift & { isRecommendation?: boolean; recommendedGroupId?: number }) => {
  try {
    // Menangani logika penambahan gift, termasuk rekomendasi, dalam satu fungsi Addgift
    const createGift = await Addgift({
      groupId,
      name,
      price,
      imageUrl,
      urlLink,
      userId,
      categoryId,
      isRecommendation,
      recommendedGroupId, // Sertakan parameter ini untuk menangani rekomendasi
    });

    // Pesan sukses mungkin perlu disesuaikan berdasarkan apakah ini rekomendasi atau tidak
    const message = isRecommendation
      ? "Successfully added recommended gift to the group"
      : "Successfully added gift to the group";

    return {
      status: 200,
      message,
      data: createGift,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};

export { Creategift };
