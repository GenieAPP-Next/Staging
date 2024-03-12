import { Createbill as Bill } from "../repository/createbill.repository";
import { createBill } from "../types/createBill.type";
import ErrorHandler from "../utils/ErrorHandler";
const Createbill = async ({ groupId }: createBill) => {
  try {
    const create = await Bill({ groupId });
    return {
      status: 200,
      message: "Successfuly Create Bill",
      data: create,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { Createbill };
