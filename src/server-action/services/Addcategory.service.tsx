import { addCategory } from "../repository/addcategory.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { categories } from "../types/categories.types";
const Addcategory = async ({ categoryName }: categories) => {
  try {
    const Categories = await addCategory({ categoryName });
    return {
      status: 200,
      message: "Successfuly add Categories",
      data: Categories,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { Addcategory };
