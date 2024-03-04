import { NextRequest, NextResponse } from "next/server";
import { Addmember } from "@/server-action/controllers/Addmember.controllers";
// import { addMember as memberObject } from "@/server-action/types/addMember.types";
export async function GET(req: NextRequest, res: NextResponse) {
  const username = req.nextUrl.searchParams.get("username");
  return await Addmember(req, res, username );
}
