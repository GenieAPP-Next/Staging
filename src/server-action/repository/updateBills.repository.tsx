import BillSplits from "@/models/BillSplits.model";
import Bills from "@/models/Bills.model";
import { updateBills as Billsupdate } from "../types/payment.types";
import Payments from "@/models/payments.model";
export const updateBills = async ({ userId, billSplitId }: Billsupdate) => {
  try {
    const findBillId = await BillSplits.findOne({
      where: {
        bill_split_id: billSplitId,
        user_id: userId,
      },
      attributes: ["bill_id", "amount"],
    });
    const billId = findBillId?.getDataValue("bill_id") as number;
    console.log(billId);
    const amountSplitBill = findBillId?.getDataValue("amount") as number;
    // const splitBillId = findBillId?.getDataValue("bill_split_id") as number;
    const findtotalAmount = await Bills.findOne({
      where: { bill_id: billId },
      attributes: ["total_amount"],
    });
    const findPaymentAmount = await Payments.findOne({
      where: {
        bill_split_id: billSplitId,
      },
      attributes: ["amount"],
    });
    const PaymentAmount = findPaymentAmount?.getDataValue("amount") as number;
    const totalAmount = findtotalAmount?.getDataValue("total_amount") as number;
    const balanceBills = totalAmount - PaymentAmount;
    const balanceSplitBill = amountSplitBill - PaymentAmount;
    const updateSplitBill = await BillSplits.update(
      {
        amount: balanceBills,
        status: "PAID",
      },
      { where: { bill_split_id: billSplitId, user_id: userId } }
    );
    const updateBills = await Bills.update(
      { total_amount: balanceBills },
      { where: { bill_id: billId } }
    );
    const checkbillAmount = await Bills.findOne({
      where: {
        bill_id: billId,
      },
      attributes: ["total_amount"],
    });
    const billAmount = checkbillAmount?.getDataValue("total_amount") as number;
    // const checkSplitbillAmount = await BillSplits.findOne({
    //   where:{
    //     bill_split_id: billSplitId,
    //     user_id: userId,
    //   },
    //   attributes: ['amount']
    // })
    if (billAmount === 0) {
      const statusbill = "PAID";
      const updateStatusBills = await Bills.update(
        { status: statusbill },
        { where: { bill_id: billId } }
      );
      const result = {
        split_bill: {
          user_id: userId,
          split_bill_id: updateSplitBill,
          amount: balanceSplitBill,
          status: "PAID",
        },
        bills: {
          bill_id: updateBills,
          total_amount: balanceBills,
          status: updateStatusBills || "PAID",
        },
      };
      return result;
    }
    const result = {
      split_bill: {
        user_id: userId,
        split_bill_id: updateSplitBill,
        amount: balanceSplitBill,
        status: "PAID",
      },
      bills: {
        bill_id: updateBills,
        total_amount: balanceBills,
        status: "Pending Waiting Payment",
      },
    };
    return result;
  } catch (error) {
    console.error("Error update Bills:", error);
    throw error;
  }
};
