import { NextApiRequest, NextApiResponse } from "next"
import { Example } from "@/server-action/controllers/Example.controller"

// export function GET(req: NextApiRequest, res: NextApiResponse, { params }: any) {
//     return Example(params.slug)
// }

import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
    console.log(params.slug);
    return Example(params.slug);
    // ...
}
