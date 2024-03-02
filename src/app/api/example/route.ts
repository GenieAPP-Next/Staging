import type { NextApiRequest, NextApiResponse } from "next";
import { Example } from "@/server-action/controllers/Example.controller";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  return Example();
}
