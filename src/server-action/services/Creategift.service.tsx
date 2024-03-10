import { Addgift } from "../repository/addgift.repository";
import { addGift } from "../types/addGift.types";
import ErrorHandler from "../utils/ErrorHandler";
const Creategift = async ({ groupId, name, price, imageUrl, urlLink, userId, categoryId }: addGift) => {
  try {
    const createGift = await Addgift({ groupId, name, price, imageUrl, urlLink, userId, categoryId });
    return {
      status: 200,
      message: "Successfuly Create Group",
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
