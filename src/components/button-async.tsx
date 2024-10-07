import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "./ui/button";
import { ReactNode } from "react";

type ButtonAsyncProps = ButtonProps & {
  isLoading: boolean; // Thêm prop isLoading
  children: ReactNode; // Thêm children vào props
};

export function ButtonAsync({
  isLoading, // Nhận isLoading
  children, // Nhận children
  ...rest
}: ButtonAsyncProps) {
  return (
    <Button disabled={isLoading} {...rest}>
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children} {/* Render children */}
    </Button>
  );
}
