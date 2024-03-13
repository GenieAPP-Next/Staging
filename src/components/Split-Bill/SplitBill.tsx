/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BillPayerLogistics from "./bill-payer-logistics";
import GiftItemLogistics from "./gift-items-logistics";
import classes from "./scss/split-bill.module.scss";
import SettleBill from "./settle-bill";
import SplitBillLogistics from "./split-bill-logistics";
import { SplitBillData } from "./type";

export default function SplitBill() {
  const [data, setData] = useState<SplitBillData | null>(null);
  const groupId = 31;
  const userId = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/getSplitBill/${groupId}/${userId}`
        );
        // console.log(response.data);
        setData(response.data.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    void fetchData();
  }, [groupId, userId]);

  // Assuming the original amount due per member is in the Bill object
  const originalAmountDue = data?.Bill?.Bill?.total_amount
    ? parseFloat(data.Bill.Bill.total_amount)
    : 0;

  // Extracting the required data
  const billPayerId = data?.Bill?.BillPayer ?? 0;
  const totalAmount = data?.Bill?.Bill?.total_amount
    ? parseFloat(data.Bill.Bill.total_amount)
    : 0;

  return (
    <section id="split-bill">
      <div className={classes.container}>
        <div className={classes.content}>
          {data?.Gift && <GiftItemLogistics gift={data.Gift} />}
          {data?.Bill?.BillPayer && (
            <BillPayerLogistics
              billPayerName={""}
              billPayerId={billPayerId}
              totalAmount={totalAmount}
            />
          )}
          {data?.SplitBills?.members && (
            <SplitBillLogistics
              members={data.SplitBills.members}
              originalAmountDue={originalAmountDue}
            />
          )}
        </div>
        <div className={classes.btnContainer}>
          <SettleBill />
        </div>
      </div>
    </section>
  );
}
