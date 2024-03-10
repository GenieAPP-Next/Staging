import { NextRequest, NextResponse } from "next/server";

const splitBill = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json();
        const { totalAmount } = body;

        return NextResponse.json(
            {
                success: true,
                message: body,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,  // Change success to false in case of an error
                message: error.message,
            },
            { status: 400 }  // Change status to 400 for a bad request
        );
    }
}

export { splitBill };
