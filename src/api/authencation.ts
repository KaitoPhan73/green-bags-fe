import { httpBag, httpServer } from "@/lib/http";
import { TLoginRequest, TLoginResponse } from "@/schema/auth.schema";
const authApi = {
  checkLogin: (body: TLoginRequest) =>
    httpBag.post<TLoginResponse>("auth/login", body),
  auth: (body: { accessToken: string; expireTime: number }) =>
    httpServer.post("/api/auth", body),
  // logoutFromNextServerToServer: (accessToken: string) =>
  //   httpServer.post<any>(
  //     "/auth/logout",
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   ),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    httpServer.post<any>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
};

export default authApi;
