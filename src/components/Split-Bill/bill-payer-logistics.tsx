import React from "react";
import { LinearProgress } from "@mui/material";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";
import classes from "./scss/split-bill-logistics.module.scss";
import { convertToInitial } from "../utils/helper-converter";

interface BillPayerLogisticsProps {
  billPayerId: number;
  billPayerName: string; // The name of the bill payer
  totalAmount: number; // The total amount of the bill
}

const BillPayerLogistics: React.FC<BillPayerLogisticsProps> = ({
  billPayerId,
  billPayerName,
  totalAmount,
}) => {
  const formattedTotalAmount =
    totalAmount !== undefined
      ? `Rp ${totalAmount.toLocaleString()}`
      : "Not Available";
  const progress = 50;

  return (
    <div className={classes.itemContainer}>
      <p>Bill Payer</p>
      <div className={classes.itemCard}>
        <div className={classes.itemList} key={billPayerId}>
          <div className={classes.wrapperAvatar}>
            <div
              className={classes.avatar}
              style={{
                backgroundColor:
                  avatarColors[
                    getColorIndex(billPayerName, avatarColors.length)
                  ],
              }}
            >
              {convertToInitial(billPayerName)}
            </div>
          </div>
          <div className={classes.wrapper}>
            <div className={classes.details}>
              <span style={{ color: "rgba(29, 27, 32, 1)" }}>
                {billPayerName}
              </span>
              <span style={{ color: "rgba(0, 170, 19, 1)" }}>
                {formattedTotalAmount}
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              className={classes.progress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayerLogistics;
