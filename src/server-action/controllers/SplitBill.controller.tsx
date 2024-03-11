import { NextRequest, NextResponse } from "next/server";

export const splitBill = async (req: NextRequest, res: NextResponse) => {
    const body = await req.text(); // Use text() instead of json()
    const parsedBody = body ? JSON.parse(body) : {};
    console.log(parsedBody);
    return NextResponse.json(
        {
            success: true,
            message: parsedBody,
        },
        { status: 200 }
    );

    // try {
    //     const { email, username, password } = body;


    //     return NextResponse.json(
    //         {
    //             success: true,
    //             message: body,
    //         },
    //         { status: 200 }
    //     );
    // } catch (error: any) {
    //     return NextResponse.json(
    //         {
    //             success: false,  // Change success to false in case of an error
    //             message: error.message,
    //         },
    //         { status: 400 }  // Change status to 400 for a bad request
    //     );
    // }
}