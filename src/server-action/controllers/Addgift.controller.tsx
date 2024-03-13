import { Creategift } from "../services/Creategift.service";
import { NextRequest, NextResponse } from "next/server";

export const Addgift = async (req: NextRequest, res: NextResponse) => {
  try {
    const { giftItems } = await req.json(); // Expecting an object with a giftItems array

    // If the array is empty or not present, throw an error
    if (!giftItems?.length) {
      throw new Error("No gift items provided");
    }

    // Process each gift item
    const giftsCreationPromises = giftItems.map(
      async (gift: any) =>
        await Creategift({
          groupId: gift.groupId,
          name: gift.name,
          price: gift.price,
          imageUrl: gift.imageUrl,
          urlLink: gift.urlLink,
          userId: gift.userId,
          categoryId: gift.categoryId,
          // Assuming isRecommendation and recommendedGroupId are optional
          isRecommendation: gift.isRecommendation,
          recommendedGroupId: gift.recommendedGroupId,
        })
    );

    // Wait for all gift creations to complete
    const createdGifts = await Promise.all(giftsCreationPromises);

    return NextResponse.json(
      {
        success: true,
        message: "Gifts successfully added",
        data: createdGifts,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error adding gifts:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "An error occurred while adding gifts",
      },
      { status: 400 }
    );
  }
};
