"use server";
import { Metadata } from "next";

import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import CardVoucher from "./components/card";
import voucherGroupApi from "@/actions/voucher-group";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { httpWifi } from "@/lib/http";
import { TVoucherGroupMsgResponse } from "@/schema/voucher-group.schema";
import { revalidateTag } from "next/cache";
import CardReports from "./components/card-report";

const deleteRangeVoucherGroup = async (ids: any[]) => {
  "use server";
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log("ids", ids);
  const result = httpWifi.delete<TVoucherGroupMsgResponse>(
    "/voucher-groups",
    {
      groupIds: ids,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  revalidateTag("/admin/voucher-groups");

  return result;
};

export default async function GroupVouchers(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await voucherGroupApi.getVoucherGroups(accessToken!, params);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <CardReports data={response.payload} />
        <DataTable
          payload={{
            ...response.payload,
            page: params.page,
            size: params.size,
          }}
          columns={columns}
          deleteAction={deleteRangeVoucherGroup}
        />
      </div>
    </>
  );
}
