import { Separator } from "@/components/ui/separator";
import HistoryList from "./_components/history-list";
import { cookies } from "next/headers";
import { getOrdersByUserId } from "@/api/order";

async function page(props: any) {
  const cookieStore = cookies();
  const storeUser = cookieStore.get("user")?.value;
  const userId = JSON.parse(storeUser!).id;
  const params = {
    page: props.searchParams.page || 1,
    limit: props.searchParams.pageSize || 6,
    status: "ACTIVE",
  };
  const response = await getOrdersByUserId(userId, params);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Lịch sử đơn hàng của bạn</h3>
      </div>
      <Separator />
      <HistoryList data={response.payload} params={params} />
    </div>
  );
}

export default page;
