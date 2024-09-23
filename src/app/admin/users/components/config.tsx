import { ChartConfig } from "@/components/ui/chart";

export type ChartConfigType = {
  totalInvoiceReportInDate: {
    label: string;
    color: string;
  };
  totalTaxAmountReport: {
    label: string;
    color: string;
  };
  totalAmountAfterTaxReport: {
    label: string;
    color: string;
  };
  totalSaleAmountReport: {
    label: string;
    color: string;
  };
  totalDiscountAmountReport: {
    label: string;
    color: string;
  };
  totalAmountWithoutTaxReport: {
    label: string;
    color: string;
  };
  totalAmountReport: {
    label: string;
    color: string;
  };
};

export const chartConfig: ChartConfigType = {
  totalInvoiceReportInDate: {
    label: "Tổng hóa đơn",
    color: "hsl(var(--chart-1))",
  },
  totalTaxAmountReport: {
    label: "Tổng số tiền thuế",
    color: "hsl(var(--chart-2))",
  },
  totalAmountAfterTaxReport: {
    label: "Tổng số tiền sau thuế",
    color: "hsl(var(--chart-3))",
  },
  totalSaleAmountReport: {
    label: "Tổng số tiền bán hàng",
    color: "hsl(var(--chart-4))",
  },
  totalDiscountAmountReport: {
    label: "Tổng số tiền giảm giá",
    color: "hsl(var(--chart-5))",
  },
  totalAmountWithoutTaxReport: {
    label: "Tổng số tiền không tính thuế",
    color: "hsl(240, 75%, 60%)",
  },
  totalAmountReport: {
    label: "Tổng số tiền",
    color: "hsl(120, 75%, 60%)",
  },
};
