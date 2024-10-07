import PageTitle from "@/components/page-tittle";
import dynamic from "next/dynamic";
const CheckoutForm = dynamic(() => import("./_components/checkout"), {
  ssr: false,
});
const page = () => {
  return (
    <div>
      <PageTitle title="Thiết kế " />
      <section className="py-12 md:py-24 lg:py-24 max-w-6xl mx-auto">
        <CheckoutForm />
      </section>
    </div>
  );
};

export default page;
