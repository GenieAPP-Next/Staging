import { NextRequest, NextResponse } from "next/server";
import { Addcategories } from "@/server-action/controllers/Addcategories.controllers";
export async function POST(req: NextRequest, res: NextResponse) {
  return await Addcategories(req, res);
}
