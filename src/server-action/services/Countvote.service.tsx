import Votes from "@/models/Votes.model";
import { Countvote } from "../types/voteGift.types";

const CountVote = async ({ giftId }: Countvote) => {
  try {
    const counting = await Votes.count({
      where: {
        gift_id: giftId,
      },
    });
    return counting;
  } catch (error) {
    // Handle errors here
    console.error("Error counting votes:", error);
    throw error;
  }
};

export { CountVote };
