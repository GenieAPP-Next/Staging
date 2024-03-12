import { Getvote } from "@/server-action/controllers/Getvote.controller";
export async function GET(request: any, { params }: any) {
  return  Getvote(Number(params.slug));
}

