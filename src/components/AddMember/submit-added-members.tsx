import { useRouter } from "next/navigation";
import { Member } from "./add-member-interface";
import classes from "./scss/add-member.module.scss";

interface Props {
  addedMembers: Member[];
}

export default function SubmitAddedMembers({ addedMembers }: Props) {
  const router = useRouter();

  const handleSubmitMembers = () => {
    const serializedMembers = JSON.stringify(addedMembers);
    localStorage.setItem('addedMembers', serializedMembers)
    router.push("/group/create");
  };

  return (
    <div className={classes.btnContainer}>
      <button
        onClick={handleSubmitMembers} 
        style={{ backgroundColor: addedMembers.length > 0 ? "#4285f4" : "rgba(29, 27, 32, 0.12)", cursor: addedMembers.length > 0 ? "pointer" : "not-allowed" }}>
          Add
      </button>
    </div>
  );
}
