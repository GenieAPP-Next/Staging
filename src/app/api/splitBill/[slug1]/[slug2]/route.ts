import { splitBill } from "@/server-action/controllers/SplitBill.controller";
// import {  NextResponse } from "next/server";

export async function POST(request: any, { params }: any) {
  return await splitBill(Number(params.slug1), Number(params.slug2));
}
