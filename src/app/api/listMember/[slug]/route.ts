import { NextRequest, NextResponse } from "next/server";
import { listMember } from "@/server-action/controllers/Showlistmember.controllers";
export async function GET(req: NextRequest, res: NextResponse, { params }:{params:{slug:number}}) {
  return await listMember(req, res, params.slug);
}
