import Gifts from "@/models/Gifts.model";
import Categories from "@/models/Categories.model";
import Users from "@/models/Users.model";
import ErrorHandler from "../utils/ErrorHandler";
import { Model } from "sequelize";

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
      attributes: [
        "name",
        "gift_id",
        "price",
        "image_url",
        "url_link",
        "category_id",
        "createdAt",
        "updatedAt",
        "user_id",
      ],
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const uniqueItems = [];
    const seenNames = new Set();

    for (const item of items as (Model<any> & any)[]) {
      const name = item.name;
      if (!seenNames.has(name)) {
        uniqueItems.push(item);
        seenNames.add(name);
      }
    }

    return uniqueItems;
  } catch (err) {
    console.error("Error finding items by category:", err);
    throw err;
  }
};
