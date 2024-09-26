"use client";
import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { TVoucherResponse } from "@/schema/voucher.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type PropCardReport = {
  label: string;
  value: any;
  className?: string;
};

type Props = {
  data: {
    status: number;
    payload: TVoucherResponse;
  };
};

type TotalValues = {
  downRate: number;
  upRate: number;
  usageUnit: number;
  password: string;
  usedDeviceNum: number;
};

type TotalLabels = {
  [key in keyof TotalValues]: string;
};

const CardReports = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  if (data.status !== 200) {
    toast({
      title: "You are redirecting!!",
      description: `${data.payload.message}`,
    });
    router.push("/admin/voucher-groups");
    return;
  }
  const totalValues: TotalValues = {
    downRate: data.payload.downRate,
    upRate: data.payload.upRate,
    usageUnit: data.payload.usageUnit,
    usedDeviceNum: data.payload.usedDeviceNum,
    password: data.payload.password,
  };

  const totalLabels: TotalLabels = {
    downRate: "Down Rate",
    upRate: "Up Rate",
    usageUnit: "Usage Unit",
    usedDeviceNum: "Used Device Number",
    password: "Password",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.keys(totalValues).map((key) => (
        <CardReport
          key={key}
          label={totalLabels[key as keyof TotalValues]}
          value={totalValues[key as keyof TotalValues]}
          className="col-span-2 md:col-span-1 lg:col-span-1"
        />
      ))}
    </div>
  );
};

const CardReport = ({ label, value, className }: PropCardReport) => {
  const [showPassword, setShowPassword] = useState(false);

  // Handler to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Conditionally render value based on whether it's a password
  const renderValue = () => {
    if (label === "Password") {
      return (
        <div className="flex items-center">
          <span className={`${showPassword ? "text-xl" : "text-4xl"} mr-2`}>
            {showPassword ? value : "••••••••"}
          </span>
          <Button
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <MdOutlineVisibilityOff className="h-6 w-6" />
            ) : (
              <MdOutlineVisibility className="h-6 w-6" />
            )}
          </Button>
        </div>
      );
    }

    return <span className="text-4xl">{value}</span>;
  };

  return (
    <Card x-chunk="dashboard-05-chunk-1" className={className}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle>{renderValue()}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CardReports;
