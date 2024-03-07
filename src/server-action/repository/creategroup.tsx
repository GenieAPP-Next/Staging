import Groups from "@/models/Groups.model";
import { createGroup as createGroupType } from "../types/createGroup.types";
export const createGroup = async ({
  name,
  category,
  eventDate,
  creatorUserId,
}: createGroupType) => {
  try {
    const newGroup = await Groups.create({
      name,
      category,
      event_date: eventDate,
      creator_user_id: creatorUserId,
    });
    return newGroup;
  } catch (err) {
    console.error("Error creating group:", err);
    throw err;
  }
};
