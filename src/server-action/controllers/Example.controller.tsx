import { NextResponse } from "next/server";

const Example = (numericValue: number) => {
  return NextResponse.json({ message: `Hello World, ${numericValue}` }, { status: 200 });
};

export { Example };
