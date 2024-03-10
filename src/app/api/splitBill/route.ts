import { splitBill } from "@/server-action/controllers/SplitBill.controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    return splitBill(req, res);
}