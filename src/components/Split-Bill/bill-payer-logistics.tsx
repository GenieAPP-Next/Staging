import { LinearProgress } from "@mui/material";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";
import classes from "./scss/split-bill-logistics.module.scss";
import { convertToInitial } from "../utils/helper-converter";

export default function BillPayerLogistics() {
  return (
    <div className={classes.itemContainer}>
      <p>Bill Payer</p>
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
                <span style={{ color: "rgba(0, 170, 19, 1)" }}>Rp 2.000.000</span>
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
    name: "Ucup",
  },
  //   {
  //     name: "Asep",
  //   },
  //   {
  //     name: "Sufian",
  //   },
];
