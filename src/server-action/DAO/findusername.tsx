import Users from "@/models/Users.model";
import { addMember as addMemberType } from "../types/addMember.types";

export const Findusername = async ({ username }: addMemberType) => {
  try {
    const findusername = await Users.findAll({
      where: {
        username: username,
      },
      attributes: ['username']
    });
    return findusername;
  } catch (err) {
    console.error("Error find Username:", err);
    throw err;
  }
};
