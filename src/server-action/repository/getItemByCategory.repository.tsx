
import Gifts from "@/models/Gifts.model";
import Categories from "@/models/Categories.model";
import Users from "@/models/Users.model";
import ErrorHandler from "../utils/ErrorHandler";

export const getItemsByCategory = async (categoryId: number) => {
  try {
    const categoryExists = await Categories.findByPk(categoryId);
    if (!categoryExists) {
      throw new ErrorHandler({
        success: false,
        status: 404,
        message: "Category not found. Please provide a valid category ID.",
      });
    }

    const items = await Gifts.findAll({
      where: {
        category_id: categoryId,
      },
      include: [
        {
          model: Users,
          attributes: ["username"],
          required: true,
        },
      ],
      attributes: [
        "user_id",
        "gift_id",
        "name",
        "price",
        "image_url",
        "url_link",
        "category_id",
        "createdAt",
        "updatedAt",
      ],
    });

    return items;
  } catch (err) {
    console.error("Error finding items by category:", err);
    throw err;
  }
};
