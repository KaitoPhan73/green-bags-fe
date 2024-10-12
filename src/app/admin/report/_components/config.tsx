import { ChartConfig } from "@/components/ui/chart";

export type ChartConfigStatusType = {
  ACTIVE: {
    label: string;
    color: string;
  };
  INACTIVE: {
    label: string;
    color: string;
  };
  COMPLETED: {
    label: string;
    color: string;
  };
};
export type ChartConfigOrderStatusType = {
  PAID: {
    label: string;
    color: string;
  };
  PENDING: {
    label: string;
    color: string;
  };
};

export const chartOrderStatusConfig: ChartConfig = {
  PAID: {
    label: "Đã Thanh Toán",
    color: "hsl(var(--chart-4))",
  },
  PENDING: {
    label: "Chờ Thanh Toán",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const chartStatusConfig = {
  COMPLETED: {
    label: "Đã Giao",
    color: "hsl(var(--chart-1))",
  },
  ACTIVE: {
    label: "Đang Giao",
    color: "hsl(var(--chart-2))",
  },
  INACTIVE: {
    label: "Đợi Xác Nhận",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const lineChartOrderConfig: ChartConfig = {
  pendingTotal: {
    label: "Tổng Chờ Thanh Toán",
    color: "hsl(var(--chart-5))", // Assign color for pending total
  },
  // pendingCount: {
  //   label: "Số Lượng Chờ Thanh Toán",
  //   color: "hsl(var(--chart-7))", // Assign color for pending count
  // },
  completedTotal: {
    label: "Tổng Đã Hoàn Thành",
    color: "hsl(var(--chart-1))", // Assign color for completed total
  },
  // completedCount: {
  //   label: "Số Lượng Đã Hoàn Thành",
  //   color: "hsl(var(--chart-8))", // Assign color for completed count
  // },
} satisfies ChartConfig;
