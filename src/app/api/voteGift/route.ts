import { NextRequest, NextResponse } from "next/server";
import { votingGift } from "@/server-action/controllers/Votegift.controllers";
export async function POST(req: NextRequest, res: NextResponse) {
  return await votingGift(req, res);
}
