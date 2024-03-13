import { GetAllItemsByCategory } from "@/server-action/controllers/GetAllItemsByCategory.controller";
export async function GET(request: any, { params }: any) {
  return await GetAllItemsByCategory(String(params.slug));
}