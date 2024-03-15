import Groups from "@/models/Groups.model";
import { inputGroupName } from "../types/findGroup.types";
import ErrorHandler from "../utils/ErrorHandler";

export const getCategoryNameFromGroup = async ({ groupName }: inputGroupName) => {
  try {
    if (!groupName) {
      throw new ErrorHandler({
        success: false,
        status: 400,
        message: "Group name is required.",
      });
    }

    const group = await Groups.findOne({
      where: { name: groupName },
      attributes: ["category"],
    });

    if (!group) {
      throw new ErrorHandler({
        success: false,
        status: 404,
        message: "Group not found. Please provide a valid group name.",
      });
    }

    return group;
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  }
};
