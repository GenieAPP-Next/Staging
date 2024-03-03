import AddMember from "@/components/AddMember/add-member";
import Navbar from "@/components/Navbar/Navbar";

export default function AddMemberPage() {
  return (
    <main>
      <Navbar pageTitle="Add Member" />
      <AddMember memberList={memberDummy} />
    </main>
  );
}

const memberDummy = [
  {
    name: "Ucup",
    status: "available",
  },
  {
    name: "Ucok",
    status: "available",
  },
  {
    name: "Wawan",
    status: "available",
  },
  {
    name: "Fitri",
    status: "available",
  },
];
