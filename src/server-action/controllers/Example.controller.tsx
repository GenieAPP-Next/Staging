import { NextResponse } from "next/server";

const Example = () => {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
};

export { Example };
