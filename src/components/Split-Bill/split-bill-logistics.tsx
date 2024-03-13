"use client";
import { LinearProgress } from "@mui/material";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";
import { convertToInitial } from "../utils/helper-converter";
import classes from "./scss/split-bill-logistics.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { Member } from "./type";

interface SplitBillLogisticsProps {
  members: Member[];
  originalAmountDue: number;
}

const SplitBillLogistics: React.FC<SplitBillLogisticsProps> = ({
  members,
  originalAmountDue,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePay = () => {
    router.push(`${pathname}/payment`);
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemHeader} style={{ marginBottom: "0.5rem" }}>
        <p>Balance</p>
        <button onClick={handlePay}>Pay</button>
      </div>

      <div className={classes.itemCard}>
        {members.map((member) => {
          const remainingAmount = parseFloat(member.amount);
          const progress =
            originalAmountDue > 0
              ? ((originalAmountDue - remainingAmount) / originalAmountDue) *
                100
              : 100;

          return (
            <div className={classes.itemList} key={member.bill_split_id}>
              <div className={classes.wrapperAvatar}>
                <div
                  className={classes.avatar}
                  style={{
                    backgroundColor:
                      avatarColors[
                        getColorIndex(
                          member.user_id.toString(),
                          avatarColors.length
                        )
                      ],
                  }}
                >
                  {convertToInitial(member.user_id.toString())}{" "}
                  {/* adjust this to display member names if available */}
                </div>
              </div>
              <div className={classes.wrapper}>
                <div className={classes.details}>
                  <span style={{ color: "rgba(29, 27, 32, 1)" }}>
                    {`User ${member.user_id}`}{" "}
                    {/* adjust to display member names if available */}
                  </span>
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
        })}
      </div>
    </div>
  );
};

export default SplitBillLogistics;
