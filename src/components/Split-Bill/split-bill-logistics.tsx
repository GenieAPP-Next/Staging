import { LinearProgress } from "@mui/material";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";
import { convertToInitial } from "../utils/helper-converter";
import classes from "./scss/split-bill-logistics.module.scss";

export default function SplitBillLogistics() {
  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemHeader} style={{ marginBottom: "0.5rem" }}>
        <p>Balance</p>
        <button>Pay</button>
      </div>

      <div className={classes.itemCard}>
        {members.map((member) => (
          <div className={classes.itemList} key={member.name}>
            <div className={classes.wrapperAvatar}>
              <div
                className={classes.avatar}
                style={{
                  backgroundColor: avatarColors[getColorIndex(member.name, avatarColors.length)],
                }}
              >
                {convertToInitial(member.name)}
              </div>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.details}>
                <span style={{ color: "rgba(29, 27, 32, 1)" }}>{member.name}</span>
                <span style={{ color: member.bill > 0 ? "rgba(220, 54, 46, 1)" : "rgba(255, 192, 0, 1)" }}>{member.bill > 0 ? `Rp ${member.bill}` : "PAID"}</span>
              </div>
              <LinearProgress variant="determinate" value={25} className={classes.progress} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const members = [
  {
    name: "Me",
    bill: 500000,
  },
  {
    name: "Asep",
    bill: 0,
  },
  {
    name: "Sufian",
    bill: 500000,
  },
];
