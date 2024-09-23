import React from "react";
import { MotionDiv } from "./motion-div";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Empty = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <MotionDiv
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col md:flex-col justify-center items-center gap-4",
        className
      )}
    >
      <Image
        src="/images/empty.webp"
        alt="not found"
        width={320}
        height={240}
      />

      {children}
    </MotionDiv>
  );
};

export default Empty;
