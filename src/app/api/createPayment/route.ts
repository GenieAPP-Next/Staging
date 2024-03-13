import { NextRequest, NextResponse } from "next/server";
import { Createpayment } from "@/server-action/controllers/Createpayment.controllers";
export async function POST(req: NextRequest, res: NextResponse) {
  return await Createpayment(req, res);
}
