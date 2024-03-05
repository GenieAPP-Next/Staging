"use client";

import { useState } from "react";
import OnboardingItem from "./onboard-item";
import { onboardings } from "./onboard-list";
import { useRouter } from "next/navigation";
import classes from "./onboarding.module.scss";

export default function OnBoardings() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardings.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/login");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  return (
    <main>
      <section id="onboardings">
        <div className={classes.container}>
          <div className={classes.content}>
            <OnboardingItem {...onboardings[currentIndex]} />
          </div>
          <div className={classes.aLayout}>
            <a onClick={handleSkip}>Skip</a>
            <a onClick={handleNext}>Next</a>
          </div>
        </div>
      </section>
    </main>
  );
}
