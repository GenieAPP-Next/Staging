import { findGroupbyUserid, countMemberGroup } from "../repository/findgroup";
import { inputFindGroup } from "../types/findGroup.types";
import ErrorHandler from "../utils/ErrorHandler";
import Groups from "@/models/Groups.model";

export const Findgroup = async ({ userId }: inputFindGroup) => {
  try {
    const findGroup = await findGroupbyUserid({ userId });
    if (!findGroup || findGroup.length === 0) {
      throw new ErrorHandler({
        success: false,
        status: 400,
        message: "Please check userId. Error find all Group",
      });
    }
    const groupIds = findGroup.map((group) => group.getDataValue("group_id"));
    const findDataGroupbygroupId = await Groups.findAll({
      where: { group_id: groupIds },
      attributes: ["group_id", "name", "category", "event_date"],
    });

    const countingMembersPromises = groupIds.map(async (groupId) => {
      const memberGroup = await countMemberGroup({ groupId });
      return { groupId, memberGroup };
    });

    const countingMembers = await Promise.all(countingMembersPromises);

    return {
      status: 200,
      message: "Success find username",
      data: {
        groups: {
          group: findDataGroupbygroupId,
          member: countingMembers,
        },
      },
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
