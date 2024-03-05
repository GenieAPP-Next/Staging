"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./splash-screen.module.scss";

export default function SplashScreen() {
  const imageVariants = {
    initial: { opacity: 0, y: -100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
    exit: { opacity: 0 },
  };
  const h1Variants = {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
    exit: { opacity: 0 },
  };

  return (
    <main>
      <AnimatePresence>
        <div className={classes.container}>
          <div className={classes.splash}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              transition={{ duration: 1, exit: { duration: 2 } }}
            >
              <Image
                src="/img/genie-banner.png"
                width={250}
                height={125}
                alt="splash-screen-banner"
                priority
              />
            </motion.div>
            <motion.h1
              initial="initial"
              animate="animate"
              exit="exit"
              variants={h1Variants}
              transition={{ duration: 1, exit: { duration: 2 } }}
            >
              Effortlessly manage gift.
              <br />
              Free on Genie.
            </motion.h1>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
}
