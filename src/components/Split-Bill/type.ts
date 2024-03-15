export interface Gift {
  Gift: {
    name: string;
    price: string;
  };
  event_date: {
    event_date: string;
  };
}

export interface Bill {
  BillPayer: number;
  BillPayerName: string;
  Bill: {
    total_amount: string;
    status: string;
  };
}

export interface User {
  username: string;
}

export interface Owner {
  bill_split_id: number;
  bill_id: number;
  user_id: number;
  group_id: number;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  name: string;
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
  user: User;
}

export interface SplitBills {
  owner: Owner;
  members: Member[];
}

export interface SplitBillData {
  Gift: Gift;
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
