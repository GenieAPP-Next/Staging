export interface paymentInput{
    billSplitId: number;
    paymentDate: Date;
    amount: number;
    paymentMethod: string;
    confirmationStatus: boolean;
}