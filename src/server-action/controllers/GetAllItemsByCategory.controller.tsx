import { NextResponse } from "next/server";
import { getItemsByCategory } from "../services/getItemsByCategory.service";

export const GetAllItemsByCategory = async (groupName: string) => {
  try {
    const allGiftByCategory = await getItemsByCategory({ groupName });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Success get all gift data by category",
      data: allGiftByCategory,
    });
  } catch (error: any) {
    console.error("Error getting all gift item data: ", error);
    return NextResponse.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
