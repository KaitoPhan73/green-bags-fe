import { Separator } from "@/components/ui/separator";
import CustomList from "./_components/custom-list";
import { cookies } from "next/headers";
import { getAllCustomsByUserId } from "@/api/custom";
import { revalidateTag } from "next/cache";

async function page(props: any) {
  const cookieStore = cookies();
  const storeUser = cookieStore.get("user")?.value;
  const userId = JSON.parse(storeUser!).id;
  const params = {
    page: props.searchParams.page || 1,
    limit: props.searchParams.pageSize || 6,
  };
  const response = await getAllCustomsByUserId(userId, params);
  revalidateTag("custom");
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Lịch sử thiết kế của tôi</h3>
      </div>
      <Separator />
      <CustomList data={response.payload} params={params} />
    </div>
  );
}

export default page;
