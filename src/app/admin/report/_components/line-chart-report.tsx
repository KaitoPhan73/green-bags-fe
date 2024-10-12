"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatPriceVND, formattedDate } from "@/lib/formatter";
import { lineChartOrderConfig } from "./config";
import { TLineChartOrder } from "@/schema/order.schema";
import Image from "next/image";

type Props = {
  data: TLineChartOrder[] | null; // Accept null data as well
};

export function LineChartOrderReport({ data }: Props) {
  const formatTooltip = (value: any) => formatPriceVND(value);
  const reversedData = data ? [...data].reverse() : [];
  console.log("Data:", reversedData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ theo ngày</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <ChartContainer
            config={lineChartOrderConfig}
            className="max-h-80 w-full"
          >
            <LineChart
              accessibilityLayer
              data={reversedData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formattedDate(value)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={10}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => formattedDate(label)}
                  />
                }
              />

              {(
                Object.keys(lineChartOrderConfig) as Array<
                  keyof typeof lineChartOrderConfig
                >
              ).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  fill={lineChartOrderConfig[key].color}
                  fillOpacity={0.4}
                  stroke={lineChartOrderConfig[key].color}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-[250px]">
            <Image
              src="/images/nothing-2.png"
              height={150}
              width={150}
              alt="nothing"
            />
            <span>Không có dữ liệu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
