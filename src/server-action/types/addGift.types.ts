export interface addGift {
  groupId: number;
  name: string;
  price: number;
  imageUrl: string;
  urlLink: string;
  userId: number;
  categoryId: number;
}
export interface addGiftbyCategory {
  categoryId: number;
  giftId: number;
}
export interface getGiftfromrecommendation {
  categoryId: number;
  giftId: number;
}