import PageTitle from "@/components/page-tittle";
// import CustomPage from "./_components/CustomV2/MainCustomPage/CustomPage";
import { getAllProducts } from "@/api/product";

import dynamic from "next/dynamic";
const CustomPage = dynamic(
  () => import("./_components/CustomV2/MainCustomPage/CustomPage"),
  {
    ssr: false,
  }
);

export default async function Design() {
  const data = await getAllProducts({ page: 1, limit: 100 });

  return (
    <div>
      <PageTitle title="Thiết kế " />
      <section className="py-12 md:py-24 lg:py-24">
        <div className="md:mx-12 lg:mx-24">
          <CustomPage bags={data.payload.listResult} />
        </div>
      </section>
    </div>
  );
}
