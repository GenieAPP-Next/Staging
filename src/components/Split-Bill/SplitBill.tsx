import BillPayerLogistics from "./bill-payer-logistics";
import GiftItemLogistics from "./gift-items-logistics";
import classes from "./scss/split-bill.module.scss";
import SettleBill from "./settle-bill";
import SplitBillLogistics from "./split-bill-logistics";

export default function SplitBill() {
  return (
    <section id="split-bill">
      <div className={classes.container}>
        <div className={classes.content}>
          <GiftItemLogistics />
          <BillPayerLogistics />
          <SplitBillLogistics />
        </div>
        <div className={classes.btnContainer}>
          <SettleBill />
        </div>
      </div>
    </section>
  );
}
