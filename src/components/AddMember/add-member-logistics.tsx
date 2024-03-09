import Image from "next/image";
import { Member } from "./add-member-interface";
import classes from "./scss/add-member-logistics.module.scss";
import { convertToInitial } from "../utils/helper-converter";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { avatarColors, getColorIndex } from "../utils/avatarColorsUtils";

interface Props {
  selectedMembers: Member[];
  onDeleteMember: (memberName: string) => void;
}

export default function AddMemberLogistics({ selectedMembers, onDeleteMember }: Props) {
  return (
    <>
      {selectedMembers.length > 0 ? (
        selectedMembers.map((member) => (
          <div key={member.user_id} className={classes.container}>
            <div className={classes.spaceItem}>
              <div className={classes.itemList}>
                <div
                  className={classes.avatar}
                  style={{
                    backgroundColor: avatarColors[getColorIndex(member.username, avatarColors.length)],
                  }}
                >
                  {convertToInitial(member.username)}
                </div>
                <span>{member.username}</span>
              </div>
              <button
                onClick={() => {
                  onDeleteMember(member.username);
                }}
              >
                <DeleteOutlineIcon className={classes.deleteButton} />
              </button>
            </div>
            <div className={classes.divider} />
          </div>
        ))
      ) : (
        <div>
          <div className={classes.noMemberImg}>
            <Image
              src="/img/empty-data.jpeg"
              width={350}
              height={350}
              alt="no-member-banner"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              priority
            />
          </div>
          <h1>Member Not Found</h1>
          <p>Search username to add to the group</p>
        </div>
      )}
    </>
  );
}
