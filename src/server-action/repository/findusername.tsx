import Users from "@/models/Users.model";
import { Findmember as inputUsername } from "../types/findMember.types";

export const Findusername = async ({ username }: inputUsername) => {
  try {
    const findusername = await Users.findOne({
      where: {
        username,
      },
      attributes: ["user_id", "username"],
    });
    return findusername;
  } catch (err) {
    console.error("Error find Username:", err);
    throw err;
  }
};
