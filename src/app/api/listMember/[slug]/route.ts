// import { NextApiRequest, NextApiResponse } from "next";
import { listMember } from "@/server-action/controllers/Showlistmember.controllers";
export async function GET(request: any, { params }: any) {
  return await listMember(Number(params.slug));
}
