import { getAllItemSplitBill } from "@/server-action/controllers/GetSplitBill.controller";

export async function GET(request: any, { params }: any) {
  return await getAllItemSplitBill(Number(params.slug1),Number(params.slug2));
}

