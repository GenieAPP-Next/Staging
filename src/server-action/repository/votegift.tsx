import Votes from "@/models/Votes.model";
import { Votegift as voteInput } from "../types/voteGift.types";
export const voteGift = async ({ giftId, userId }: voteInput) => {
    try{
        const vote = await Votes.create({
            giftId,
            userId
        });
        return vote
    } catch(error){
        console.error("Error vote gift:", error);
    throw error;
    }
};
