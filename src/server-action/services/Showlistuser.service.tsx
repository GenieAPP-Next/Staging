import { showlistmember as inputGroupId } from "../types/addmember.types";
import { Listmembergroup } from "../repository/showlistmember";
import ErrorHandler from "../utils/ErrorHandler";
const showlistmember = async ({ groupId }: inputGroupId) => {
  try {
    const listmember = await Listmembergroup({ groupId });
    if(!listmember){
        return{
            status:200,
            message: "Members Empty",
        }
    }
    return {
      status: 200,
      message: "Sucess show List member group",
      data: listmember,
    };
  } catch (error: any) {
    throw new ErrorHandler({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};

export { showlistmember };
