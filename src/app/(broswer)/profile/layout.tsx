import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Hồ sơ",
    href: "/profile",
  },
  {
    title: "Cập nhật mật khẩu",
    href: "/profile/password",
  },
  {
    title: "Lich sử mua hàng",
    href: "/profile/orders",
  },
  {
    title: "Thiết kế của tôi",
    href: "/profile/customizes",
  },
];

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" space-y-6 p-10  pb-16 ">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Hồ sơ</h2>
        <p className="text-muted-foreground">
          Quản lý thông tin cá nhân và mật khẩu
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-3xl">{children}</div>
      </div>
    </div>
  );
}

export default layout;
