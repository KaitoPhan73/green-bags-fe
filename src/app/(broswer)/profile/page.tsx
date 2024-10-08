import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./components/profile-form";
import { getAccountById } from "@/api/account";
import { cookies } from "next/headers";

async function page() {
  // const cookieStore = cookies();
  // const accessToken = cookieStore.get("accessToken")?.value;
  // const response = await getAccountById(accessToken!);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ</h3>
        <p className="text-sm text-muted-foreground">
          Thông tin cá nhân của bạn
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export default page;
