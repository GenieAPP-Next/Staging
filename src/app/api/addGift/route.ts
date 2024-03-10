import { NextRequest, NextResponse } from "next/server";
import { Addgift } from "@/server-action/controllers/Addgift.controller";
export async function POST(req: NextRequest, res: NextResponse) {
  return await Addgift(req, res);
}
