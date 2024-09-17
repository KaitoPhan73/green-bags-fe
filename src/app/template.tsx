"use client";

import { MotionDiv } from "@/components/motion-div";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </MotionDiv>
  );
}
