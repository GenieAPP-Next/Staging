import { Getvote } from "@/server-action/controllers/Getvote.controller";
export async function GET(request: any, { params }: any) {
  return await Getvote(Number(params.slug));
}

