"use server";

import { httpBag, httpServer } from "@/lib/http";
import {
  TLoginRequest,
  TAuthResponse,
  TRegisterRequest,
} from "@/schema/auth.schema";

const checkLogin = async (body: TLoginRequest) => {
  return httpBag.post<TAuthResponse>("/auth/login", body);
};

const register = async (body: TRegisterRequest) => {
  return httpBag.post<TAuthResponse>("/account/create", body);
};

// const auth = async (body: { expireTime: number; user: TAuthResponse }) => {
//   return httpServer.post("/api/auth", body);
// };

export { checkLogin, register };

// Uncomment and adjust if needed
// export async function logoutFromNextServerToServer(accessToken: string) {
//   return httpServer.post<any>(
//     "/auth/logout",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
// }
