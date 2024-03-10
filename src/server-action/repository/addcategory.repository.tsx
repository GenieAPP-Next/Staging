import Categories from "@/models/Categories.model";
import { categories } from "../types/categories.types";
export const addCategory = async ({ categoryName }: categories) => {
  try {
    const Createcategory = await Categories.create({ 
        category_name: categoryName });
    return Createcategory;
  } catch (err) {
    console.error("Error add category:", err);
    throw err;
  }
};
