import { Findmember } from "@/server-action/controllers/Findmember.controllers";

export async function GET(request: any, { params }: any) {
  return await Findmember(String(params.slug));
}

