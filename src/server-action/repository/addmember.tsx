import GroupMembers from "@/models/GroupMember.model";
import { addMember as addmemberType } from "../types/addMember.types";
export const addmember = async ({ groupId, userId, role }: addmemberType) => {
  try {
    const addmember = await GroupMembers.create({
      group_id: groupId,
      user_id: userId,
      role,
    });
    return addmember;
  } catch (err) {
    console.error("Error add member:", err);
    throw err;
  }
};
