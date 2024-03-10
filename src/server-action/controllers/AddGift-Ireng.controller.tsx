import { NextResponse, NextRequest } from "next/server";
import { Creategift } from "../services/Creategift.service";

const AddGift = async (req: NextRequest, res: NextResponse) => {
	try {
		const body = await req.json();
		const { groupId, name, price, imageUrl, urlLink, userId, categoryId } =
			body;
		const Addgift = await Creategift({
			groupId,
			name,
			price,
			imageUrl,
			urlLink,
			userId,
			categoryId,
		});
		return NextResponse.json({
			success: true,
			message: "Success Add Gift",
			data: Addgift,
		});
	} catch (error: any) {
		return NextResponse.json({
			success: false,
			message: error.message,
		});
	}
};

export default AddGift;
