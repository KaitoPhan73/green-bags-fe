"use client";
import authApi from "@/actions/authencation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const logout = async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        await authApi.logoutFromNextClientToNextServer(true, signal);
        router.push(`/login?redirectFrom=${pathname}`);
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        router.refresh();
      }
    };

    logout();

    return () => {
      controller.abort();
    };
  }, [router, pathname]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* <dotlottie-player
          src="https://lottie.host/d4dd4311-b564-4771-83e3-06141e29eeb4/tQqrViPvvP.json"
          background="transparent"
          speed="1"
          style={{ width: 150, height: 150 }}
          loop
          autoplay
        ></dotlottie-player> */}
        <div>Logging out...</div>
      </div>
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogoutLogic />
    </Suspense>
  );
}
