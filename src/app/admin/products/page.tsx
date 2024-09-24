"use server";

import { DataTable } from "@/components/table/data-table";
import CardReports from "../users/components/card-report";

interface TVoucherGroupResponse {
  id: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: null;
  modifiedBy: null;
  status: string;
  baseModelID: string;
  finalPrice: number;
}

interface TTableResponse<T> {
  page: number;
  totalPage: number;
  limit: number;
  listResult: T[];
}

export default async function ProductsPage(props: any) {
  // Dữ liệu cứng
  const mockData: TTableResponse<TVoucherGroupResponse> = {
    page: 1,
    totalPage: 1,
    limit: 10,
    listResult: [
      {
        id: "0ce7b0ea-907b-4199-86dd-79836f1bcef9",
        createdDate: "2024-09-09T16:06:37.581+00:00",
        modifiedDate: "2024-09-09T09:06:37.581+00:00",
        createdBy: null,
        modifiedBy: null,
        status: "ACTIVE",
        baseModelID: "66168090-e5af-435b-9b77-1833406f131d",
        finalPrice: 1000,
      },
      {
        id: "8d246d3f-5089-4102-98d4-285e1b9233ad",
        createdDate: "2024-09-12T07:28:22.869+00:00",
        modifiedDate: "2024-09-12T00:28:22.869+00:00",
        createdBy: null,
        modifiedBy: null,
        status: "ACTIVE",
        baseModelID: "9f209019-608c-4a1b-92ef-da74ceb8f5bb",
        finalPrice: 1000,
      },
    ],
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <CardReports data={mockData} /> {/* Truyền mockData đúng kiểu */}
        <DataTable
          payload={mockData} // Sử dụng dữ liệu cứng ở đây
          columns={props} // Giả sử bạn có cột định nghĩa từ props
        />
      </div>
    </>
  );
}
