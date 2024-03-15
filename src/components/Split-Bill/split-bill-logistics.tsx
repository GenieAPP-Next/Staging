/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { LinearProgress } from "@mui/material";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";
import { convertToInitial } from "../utils/helper-converter";
import classes from "./scss/split-bill-logistics.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { Member, Owner } from "./type";

interface SplitBillLogisticsProps {
  // owner: Owner;
  members: Member[];
  originalAmountDue: number;
}

const SplitBillLogistics: React.FC<SplitBillLogisticsProps> = ({
  // owner,
  members,
  originalAmountDue,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePay = () => {
    router.push(`${pathname}/payment`);
  };

  const displayUserInfo = (user: Member | Owner) => {
    const remainingAmount = parseFloat(user.amount);
    const progress =
      originalAmountDue > 0
        ? ((originalAmountDue - remainingAmount) / originalAmountDue) * 100
        : 100;

    const username = user.user.username; // Get the username from the user object

    return (
      <div className={classes.itemList} key={user.bill_split_id}>
        <div className={classes.wrapperAvatar}>
          <div
            className={classes.avatar}
            style={{
              backgroundColor:
                avatarColors[
                  getColorIndex(user.user_id.toString(), avatarColors.length)
                ],
            }}
          >
            {convertToInitial(username)} {/* Use the username here */}
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.details}>
            <span style={{ color: "rgba(29, 27, 32, 1)" }}>{username}</span>
            <span
              style={{
                color:
                  remainingAmount > 0
                    ? "rgba(220, 54, 46, 1)"
                    : "rgba(0, 170, 19, 1)",
              }}
            >
              {remainingAmount > 0
                ? `Rp ${remainingAmount.toLocaleString()}`
                : "PAID"}
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={classes.progress}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemHeader} style={{ marginBottom: "0.5rem" }}>
        <p>Balance</p>
        <button onClick={handlePay}>Pay</button>
      </div>

      <div className={classes.itemCard}>
        {/* Display the owner's data */}
        {/* {displayUserInfo(owner)} */}

        {/* Display the members' data */}
        {members.map((member) => displayUserInfo(member))}
      </div>
    </div>
  );
};

export default SplitBillLogistics;
