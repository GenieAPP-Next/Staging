import { NextRequest, NextResponse } from "next/server";
import { Addmember } from "@/server-action/controllers/Addmember.controllers";

// export async function GET(req: NextRequest, res: NextResponse) {
// //   const userName = req.nextUrl.searchParams.get("username") ?? '' ;
//   return await Addmember(req, res);
// }
export async function POST(req: NextRequest, res: NextResponse) {
    return await Addmember(req, res);
  }