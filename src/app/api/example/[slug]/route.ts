import { Example } from "@/server-action/controllers/Example.controller";
export async function GET(request: any, { params }: any) {
    console.log(params.slug);
    return Example(Number(params.slug));
    // ...
  }