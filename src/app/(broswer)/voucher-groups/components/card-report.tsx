import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { TTableResponse } from "@/types/Table";
import { TVoucherGroupResponse } from "@/schema/voucher-group.schema";

type PropCardReport = {
  label: string;
  value: any;
  className?: string;
};

type Props = {
  data: TTableResponse<TVoucherGroupResponse>;
};

type TotalValues = {
  vocherNum: number;
  totalGroupVouncher: number;
  // totalAmountAfterTax: number;
  // totalSaleAmount: number;
  // totalDiscountAmount: number;
  // totalAmountWithoutTax: number;
  // totalAmount: number;
};

type TotalLabels = {
  [key in keyof TotalValues]: string;
};

const CardReports = ({ data }: Props) => {
  const totalValues: TotalValues = {
    vocherNum: data.result.reduce(
      (sum, item) => sum + Number(item.vocherNum),
      0
    ),
    totalGroupVouncher: data.result.length,
    // totalAmountAfterTax: data.result.reduce(
    //   (sum, item) => sum + Number(item.totalAmountAfterTaxReport),
    //   0
    // ),
    // totalSaleAmount: data.result.reduce(
    //   (sum, item) => sum + Number(item.totalSaleAmountReport),
    //   0
    // ),
    // totalDiscountAmount: data.result.reduce(
    //   (sum, item) => sum + Number(item.totalDiscountAmountReport),
    //   0
    // ),
    // totalAmountWithoutTax: data.result.reduce(
    //   (sum, item) => sum + Number(item.totalAmountWithoutTaxReport),
    //   0
    // ),
    // totalAmount: data.result.reduce(
    //   (sum, item) => sum + Number(item.totalAmountReport),
    //   0
    // ),
  };

  const totalLabels: TotalLabels = {
    vocherNum: "Total Voucher",
    totalGroupVouncher: "Total Group Voucher",
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
  return (
    <Card x-chunk="dashboard-05-chunk-1" className={className}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CardReports;
