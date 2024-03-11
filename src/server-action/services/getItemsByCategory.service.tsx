import { getCategoryNameFromGroup } from "../repository/getCategoryNameFromGroup.repository";
import { getCategoryId } from "../repository/getCategoryId.repository";
import { getItemsByCategory as getItems } from "../repository/getItemByCategory.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { inputGroupName } from "../types/findGroup.types";

export const getItemsByCategory = async ({ groupName }: inputGroupName) => {
  try {
    const category = await getCategoryNameFromGroup({ groupName });
    const categoryValue: string = category.getDataValue("category");
    const categoryId = await getCategoryId(categoryValue);
    const categoryIdValue: number = categoryId.getDataValue("category_id");
    const giftsDataByCategory = await getItems(categoryIdValue);

    if (!giftsDataByCategory || giftsDataByCategory.length === 0) {
      throw new ErrorHandler({
        success: true,
        status: 200,
        message: "No item found in this category",
      });
    }

    return giftsDataByCategory;
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  }
};
