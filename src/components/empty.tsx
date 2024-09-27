import React from "react";
import { MotionDiv } from "./motion-div";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Empty = ({
  children,
  className,
  width = 320, // Giá trị mặc định cho width
  height = 240, // Giá trị mặc định cho height
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
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
        width={width}
        height={height}
      />
      {children}
    </MotionDiv>
  );
};

export default Empty;
