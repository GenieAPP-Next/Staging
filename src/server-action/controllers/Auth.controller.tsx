import { NextRequest, NextResponse } from "next/server";
import { registerService, loginService } from "../services/Auth.service";

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

const LoginController = async (req: NextRequest, res: NextResponse) => {
	if (req.method === "POST") {
		const body = await req.json();
		const { email, password } = body;
		console.log(body);

		try {
			// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
			const userLog = await loginService({ email, password });
			console.log(userLog);
			return NextResponse.json(
				{
					success: true,
					status: userLog.status,
					message: userLog.message,
					data: userLog.data,
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

export { RegisterController, LoginController };
