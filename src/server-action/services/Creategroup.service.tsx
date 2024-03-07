import { createGroup } from "../repository/creategroup";
import ErrorHandler from "../utils/ErrorHandler";
import { createGroup as inputCreateGroup } from "../types/createGroup.types";
const createGroupService = async ({
  name,
  category,
  eventDate,
  creatorUserId,
}: inputCreateGroup) => {
  try {
    const NewGroup = await createGroup({
      name,
      category,
      eventDate,
      creatorUserId,
    });
    const groupId = NewGroup.getDataValue("group_id")
    return {
      status: 200,
      message: "Successfuly Create Group",
      data: {
        NewGroup,
        Id: groupId
      }
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { createGroupService };
