// import { NextResponse } from "next/server";

// const Example = () => {
//   return NextResponse.json({ message: "Hello World" }, { status: 200 });
// };

// export { Example };

const inputTesting= ({params}: { params: {slug: string}}) => { 
  const usernameInput = params.slug
    return(
        usernameInput
    )
}

export default inputTesting
