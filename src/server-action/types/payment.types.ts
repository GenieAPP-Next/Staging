export interface paymentInput {
  billSplitId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
  confirmationStatus: boolean;
}
export interface updateBills {
  userId: number;
  billSplitId: number;
}

export interface checkPayment {
  billSplitId: number;
  confirmationStatus: boolean;
}
