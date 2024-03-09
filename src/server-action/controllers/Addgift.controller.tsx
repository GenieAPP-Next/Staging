import { Creategift } from "../services/Creategift.service";
import { NextRequest, NextResponse } from "next/server";
export const Addgift = async (req: NextRequest, res: NextResponse) => {
    try {
    const body = await req.json();
    const { groupId,name, price, imageUrl, urlLink, userId, categoryId } = body;
    const createGift = await Creategift({ groupId, name, price, imageUrl, urlLink, userId, categoryId });
    return NextResponse.json( 
        {
            success: true,
            message: "Success add Gift",
            data: createGift,
          },
          { status: 200 }
    )
  } catch (err: any) {
    console.error("Error Add gift:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 }
    );
  }
}