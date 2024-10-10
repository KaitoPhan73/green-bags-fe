"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, TooltipProps } from "recharts";
import { formatPriceVND } from "@/lib/formatter";
import { chartOrderStatusConfig } from "./config";
import { TPieChartOrderStatus } from "@/schema/order.schema";
import Image from "next/image";

type Props = {
  data: TPieChartOrderStatus[];
};
export default function PieChartOrderStatusReport({ data }: Props) {
  const customTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { label, value, fill } = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: `4px solid ${fill}`,
          }}
        >
          <p style={{ color: fill }}>{label}</p>
          <p>{value} lượt</p>
        </div>
      );
    }
    return null;
  };

  const chartData = data.map((item) => ({
    label: chartOrderStatusConfig[item.status].label,
    value: item.count,
    fill: chartOrderStatusConfig[item.status].color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Trạng thái thanh toán đơn hàng</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent
        className={`flex-1 pb-0 ${
          chartData.length > 0
            ? "lg:grid lg:grid-cols-2 md:grid md:grid-cols-2"
            : "grid-cols-1"
        } sm:flex sm:flex-col flex flex-col gap-4`}
      >
        {chartData.length > 0 ? (
          <>
            <ChartContainer
              config={chartOrderStatusConfig}
              className="mx-auto aspect-square max-h-[250px] lg:col-span-1 md:col-span-1 w-full"
            >
              <PieChart>
                <ChartTooltip content={customTooltip} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>

            <div className="grid grid-cols-3 lg:grid-cols-1 md:grid-cols-1 lg:flex-col md:flex-col items-start mt-4">
              {chartData.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center mb-2 col-span-1 w-full overflow-hidden"
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="truncate">{entry.label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-[250px]">
            <Image
              src="/images/nothing.png"
              height={200}
              width={200}
              alt="nothing"
            />
            <span>Không có dữ liệu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
