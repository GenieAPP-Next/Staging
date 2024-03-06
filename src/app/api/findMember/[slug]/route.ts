import { NextRequest, NextResponse } from "next/server";
import { Findmember } from "@/server-action/controllers/Findmember.controllers";

export async function GET(req: NextRequest, res: NextResponse) {
  return await Findmember(req, res);
}
