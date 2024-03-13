import { addmember } from "../repository/addmember";
import ErrorHandler from "../utils/ErrorHandler";
import { addMember as addMemberInput } from "../types/addMember.types";
const addUsernameService = async ({
  groupId,
  userId,
  role,
}: addMemberInput) => {
  try {
    const addMemberGroup = await addmember({ groupId, userId, role });
    return {
      status: 200,
      message: "Successfuly add member group",
      data: addMemberGroup,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
export { addUsernameService };
