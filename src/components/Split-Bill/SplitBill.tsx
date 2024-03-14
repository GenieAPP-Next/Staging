/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import BillPayerLogistics from "./bill-payer-logistics";
import GiftItemLogistics from "./gift-items-logistics";
import classes from "./scss/split-bill.module.scss";
import SettleBill from "./settle-bill";
import SplitBillLogistics from "./split-bill-logistics";
import { SplitBillData } from "./type";

export default function SplitBill() {
  const [data, setData] = useState<SplitBillData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groupId, setGroupId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    // Retrieve groupId and userId from localStorage
    const storedGroupId = parseInt(localStorage.getItem("group_id") ?? "0", 10);
    const storedUserId = parseInt(localStorage.getItem("user_id") ?? "0", 10);
    setGroupId(storedGroupId);
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (groupId > 0 && userId > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/api/getSplitBill/${groupId}/${userId}`
          );
          setData(response.data.data.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchData();
    }
  }, [groupId, userId]);

  const originalAmountDue = data?.Bill?.Bill?.total_amount
    ? parseFloat(data.Bill.Bill.total_amount)
    : 0;

  const billPayerId = data?.Bill?.BillPayer ?? 0;
  const billPayerName = data?.Bill?.BillPayerName ?? "";
  const totalAmount = data?.Bill?.Bill?.total_amount
    ? parseFloat(data.Bill.Bill.total_amount)
    : 0;

  const eventDate = data?.Gift?.event_date?.event_date ?? "";

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <section id="split-bill">
      <div className={classes.container}>
        <div className={classes.content}>
          {data?.Gift && (
            <GiftItemLogistics gift={data.Gift.Gift} eventDate={eventDate} />
          )}
          {data?.Bill?.BillPayer && (
            <BillPayerLogistics
              billPayerName={billPayerName}
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
