import Categories from "@/models/Categories.model";
import ErrorHandler from "../utils/ErrorHandler";
// import { categories } from "../types/categories.types";

export const getCategoryId = async (categoryName: string) => {
  try {
    if (!categoryName) {
      throw new ErrorHandler({
        success: false,
        status: 404,
        message: "Group not found. Please provide a valid group name.",
      });
    }

    const categoryId = await Categories.findOne({
      where: {
        category_name: categoryName,
      },
      attributes: ["category_id"],
    });

    if (!categoryId) {
      throw new ErrorHandler({
        success: false,
        status: 404,
        message: "Category not found. Please provide a valid category name.",
      });
    }

    return categoryId;
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  }
};
