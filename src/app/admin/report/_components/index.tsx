"use client";
import { TTableResponse } from "@/types/Table";
import { LineChartOrderReport } from "./line-chart-report";

// import CardReports from "./card-report";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  TLineChartOrder,
  TPieChart,
  TPieChartOrderStatus,
} from "@/schema/order.schema";
import PieChartStatusReport from "./pie-chart-status-report";
import PieChartOrderStatusReport from "./pie-chart-order-status-report";

type Props = {
  data: {
    lineChartOrderItems: TLineChartOrder[];
    pieChartStatusItems: TPieChart[];
    pieChartOrderStatusItems: TPieChartOrderStatus[];
  };
};

export function Report({ data }: Props) {
  return (
    <div>
      <div className="my-4">
        <p className="text-3xl">Báo cáo</p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col lg:flex-row lg:items-center gap-4">
          <DatePickerWithRange />
        </div>

        {/* <div className="col-span-12">
  <CardReports data={data.reportItems} />
</div> */}

        <div className="col-span-12 ">
          <LineChartOrderReport data={data.lineChartOrderItems} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <PieChartStatusReport data={data.pieChartStatusItems} />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <PieChartOrderStatusReport data={data.pieChartOrderStatusItems} />
        </div>
      </div>
    </div>
  );
}
