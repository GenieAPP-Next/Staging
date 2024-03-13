import { findGroup } from "@/server-action/controllers/Findgroup.controllers";
export async function GET(request: any, { params }: any) {
  return await findGroup(Number(params.slug));
}
