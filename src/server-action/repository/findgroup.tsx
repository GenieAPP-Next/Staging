import Groups from "@/models/Groups.model";
import GroupMembers from "@/models/GroupMember.model";
import { inputFindGroup, inputCountmember } from "../types/findGroup.types";
const findGroup = async ({ name }: inputFindGroup) => {
  try {
    const findgrup = await Groups.findOne({
      where: {
        name,
      },
      attributes: ["name", "category", "event_date"],
    });
    return findgrup;
  } catch (err) {
    console.error("Error find Username:", err);
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

export { findGroup, countMemberGroup };
