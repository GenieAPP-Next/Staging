export interface Votegift {
    userId: number;
    giftId: number
}
export interface Countvote{
    giftId: number;
}
export interface Membergroup{
    groupId: number;
}

export interface Detailgroup{
    groupId: number;
}
export interface checkvotebyuserId{
    giftId: number;
}
export interface checkvote{
    giftId: number;
    userId: number;
}
