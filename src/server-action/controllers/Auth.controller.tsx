import { NextRequest, NextResponse } from "next/server";
import { registerService } from "../services/Auth.service";

const RegisterController = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const body = await req.json();
    const { email, username, password } = body;
    console.log(req.body);

    try {
      const userReg = await registerService({ email, username, password });
      return NextResponse.json(
        {
          success: true,
          status: userReg.status,
          message: userReg.message,
          data: userReg.data,
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.log(error);
      if (error.success === false) {
        const status: number =
          typeof error.status === "number" ? error.status : 500;
        return NextResponse.json(
          {
            success: false,
            status: error.status,
            message: error.message,
          },
          { status }
        );
      }
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: `Method ${req.method} is invalid`,
      },
      { status: 200 }
    );
  }
};

export { RegisterController };
