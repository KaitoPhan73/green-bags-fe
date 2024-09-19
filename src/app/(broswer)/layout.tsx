import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
