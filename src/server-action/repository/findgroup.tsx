// import Groups from "@/models/Groups.model";
import GroupMembers from "@/models/GroupMember.model";
import { inputFindGroup, inputCountmember } from "../types/findGroup.types";
const findGroupbyUserid = async ({ userId }: inputFindGroup) => {
  try {
    const findgrup = await GroupMembers.findAll({
      where: {
        user_id: userId
      },
      attributes: ["group_id"],
    });

    return findgrup;
  } catch (err) {
    console.error("Error find Group:", err);
    throw err;
  }
};
const countMemberGroup = async ({ groupId }: inputCountmember) => {
  try {
    const countMember = await GroupMembers.count({
      where: {
        group_id: groupId,
      },
    });
    return countMember;
  } catch (err) {
    console.error("Error find Username:", err);
    throw err;
  }
};

export { findGroupbyUserid, countMemberGroup };
