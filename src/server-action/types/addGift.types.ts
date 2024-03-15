export interface addGift {
  groupId: number;
  name: string;
  price: number;
  imageUrl: string;
  urlLink: string;
  userId: number;
  categoryId: number;
  isRecommendation?: boolean;
}
