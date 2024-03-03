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
  {
    name: "Nur",
    status: "available",
  },
  {
    name: "Ricky",
    status: "available",
  },
  {
    name: "Rizky",
    status: "available",
  },
  {
    name: "Nisa",
    status: "available",
  },
  {
    name: "Ihsan",
    status: "available",
  },
  {
    name: "Asep",
    status: "available",
  },
  {
    name: "Udin",
    status: "available",
  },
];
