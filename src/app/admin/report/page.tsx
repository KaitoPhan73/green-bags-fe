import React from "react";
import { Report } from "./_components";
import {
  getLineChartOrders,
  getPieChartOrderStatus,
  getPieChartStatus,
} from "@/api/order";
import { formattedDateV2 } from "@/lib/formatter";
import { revalidateTag } from "next/cache";

const page = async (props: any) => {
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 7);

  const params = {
    fromDate: props.searchParams.fromDate || formattedDateV2(threeDaysAgo),
    toDate: props.searchParams.toDate || formattedDateV2(today),
  };

  const paramLine = {
    startDate: props.searchParams.fromDate || formattedDateV2(threeDaysAgo),
    endDate: props.searchParams.toDate || formattedDateV2(today),
  };
  const pieChartsStatus = getPieChartStatus(params);
  const pieChartsOrderStatus = getPieChartOrderStatus(params);
  const lineChartsOrder = getLineChartOrders(paramLine);

  const [
    pieChartStatusResponse,
    pieChartOrderStatusResponse,
    lineChartOrderResponse,
  ] = await Promise.all([
    pieChartsStatus,
    pieChartsOrderStatus,
    lineChartsOrder,
  ]);
  revalidateTag("orders");
  const data = {
    lineChartOrderItems: lineChartOrderResponse.payload,
    pieChartStatusItems: pieChartStatusResponse.payload,
    pieChartOrderStatusItems: pieChartOrderStatusResponse.payload,
  };
  return <Report data={data} />;
};

export default page;
