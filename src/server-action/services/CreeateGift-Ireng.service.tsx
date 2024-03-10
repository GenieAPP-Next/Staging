import AddGiftRepository from "../repository/addgift-ireng.repostiory";
import addGiftTypes from "../types/addGift-Ireng.types";

const createGift = async ({
	groupId,
	name,
	price,
	imageUrl,
	urlLink,
	userId,
	categoryId,
}: addGiftTypes) => {
	try {
		const addGift = await AddGiftRepository({
			groupId,
			name,
			price,
			imageUrl,
			urlLink,
			userId,
			categoryId,
		});
		return addGift;
	} catch (error: any) {
		return error.message;
	}
};

export default createGift;
