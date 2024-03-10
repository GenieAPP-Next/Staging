import GroupMembers from "@/models/GroupMember.model";
// import { addMember } from "../types/addmember.types";
import { showlistmember } from "../types/addmember.types";
export const Listmembergroup = async ({ groupId }: showlistmember) => {
  try {
    const memberGroup = await GroupMembers.findAll({
      where: {
        group_id: groupId,
      },
      attributes: ["user_id"],
    });
    return memberGroup;
  } catch (err) {
    console.error("Error List member Group:", err);
    throw err;
  }
};
