import { Separator } from "@/components/ui/separator";
import { PasswordForm } from "../components/password-form";

function page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dổi mật khâu</h3>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  );
}

export default page;
