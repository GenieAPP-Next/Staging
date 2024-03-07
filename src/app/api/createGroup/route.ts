import { NextRequest, NextResponse } from "next/server";
import { Creategroup } from "@/server-action/controllers/Creategroup.controllers";
export async function POST(req: NextRequest, res: NextResponse) {
  return await Creategroup(req, res);
}
