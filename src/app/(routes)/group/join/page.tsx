"use client";

import Navbar from "@/components/Navbar/Navbar";
import JoinGroupForm from "@/containers/JoinGroupForm/JoinGroupForm";
import styles from "@/app/(routes)/group/join/page.module.css";

const JoinGroup = () => {
  return (
    <>
      <Navbar pageTitle={"Join Group"} />
      <div className={styles.main}>
        <JoinGroupForm />
      </div>
    </>
  );
};

export default JoinGroup;
