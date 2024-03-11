import Navbar from "@/components/Navbar/Navbar";
import SplitBill from "@/components/Split-Bill/SplitBill";

export default function SplitBillPage() {
  return (
    <main>
      <Navbar pageTitle="Bill" />
      <SplitBill />
    </main>
  );
}
