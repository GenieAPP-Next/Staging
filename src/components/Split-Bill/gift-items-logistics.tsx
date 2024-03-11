import classes from "./scss/split-bill-logistics.module.scss";

export default function GiftItemLogistics() {
  return (
    <div className={classes.giftCard}>
      <div className={classes.giftItem}>
        <p>Daniel Wellington</p>
        <span>17 August 2023</span>
      </div>
      <div className={classes.giftPrice}>
        <span>Rp 2.345.000</span>
      </div>
    </div>
  );
}
