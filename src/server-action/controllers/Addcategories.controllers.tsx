import { Addcategory } from "../services/Addcategory.service";
import { NextRequest, NextResponse } from "next/server";
import { categories } from "../types/categories.types";

export const Addcategories = async (req: NextRequest, res: NextResponse) => {
  try {
    const { categoryName }: categories = await req.json();
    const AddCategories = await Addcategory({ categoryName });

    return NextResponse.json(
      {
        success: true,
        message: "Success add category",
        data: AddCategories,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error add Category:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 }
    );
  }
};
