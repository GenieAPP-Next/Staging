import { findGroup, countMemberGroup } from "../repository/findgroup";
import { inputFindGroup, inputCountmember } from "../types/findGroup.types";
import ErrorHandler from "../utils/ErrorHandler";

export const Findgroup = async (
  { name }: inputFindGroup,
  { groupId }: inputCountmember
) => {
  try {
    const findingGroup = await findGroup({ name });
    if (!findingGroup) {
      throw new ErrorHandler({
        success: false,
        status: 400,
        message: "group not found",
      });
    }
    const countingMemberGrup = await countMemberGroup({ groupId });
    return {
      status: 200,
      message: "Success find username",
      data: {
        group: findingGroup,
        member: countingMemberGrup,
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
