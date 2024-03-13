export interface GiftItem {
  name: string;
  price: string;
}

export interface Bill {
  BillPayer: number;
  Bill: {
    total_amount: string;
    status: string;
  };
}

export interface Member {
  name: string;
  bill_split_id: number;
  bill_id: number;
  user_id: number;
  group_id: number;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SplitBills {
  owner: Member;
  members: Member[];
}

export interface SplitBillData {
  Gift: GiftItem;
  Bill: Bill;
  SplitBills: SplitBills;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    status: number;
    message: string;
    data: SplitBillData;
  };
}
