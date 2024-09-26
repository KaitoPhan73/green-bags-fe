import { Metadata } from "next";
import CardReports from "./components/card-report";
import { cookies } from "next/headers";
import voucherApi from "@/actions/voucher";

export const metadata: Metadata = {
  title: "Voucher",
  description: "See the voucher details",
};

export default async function Voucher({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await voucherApi.getVoucher(accessToken!, {
    groupId: params.slug,
  });
  return (
    <>
      <div className="space-y-4">
        <p className="text-3xl">Voucher Report</p>
      </div>

      <div className="flex h-full flex-1 flex-col">
        <CardReports data={response} />
      </div>
    </>
  );
}
