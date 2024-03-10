import Gifts from "@/models/Gifts.model";
import addGiftTypes from "../types/addGift-Ireng.types";

const AddGiftRepository = async ({
	groupId,
	name,
	price,
	imageUrl,
	urlLink,
	userId,
	categoryId,
}: addGiftTypes) => {
	try {
		const giftSuccess = await Gifts.create({
			group_id: groupId,
			name,
			price,
			image_url: imageUrl,
			url_link: urlLink,
			user_id: userId,
			category_id: categoryId,
		});
		return giftSuccess;
	} catch (err: any) {
		console.error("Error add category:", err);
		throw err;
	}
};

export default AddGiftRepository;
