"use server";

import { httpBag, httpServer } from "@/lib/http";
import {
  TLoginRequest,
  TAuthResponse,
  TRegisterRequest,
} from "@/schema/auth.schema";
import { revalidateTag } from "next/cache";

const checkLogin = async (body: TLoginRequest) => {
  return httpBag.post<TAuthResponse>("/auth/login", body);
};

const register = async (body: TRegisterRequest) => {
  const response = await httpBag.post<TAuthResponse>("/account/create", body);
  revalidateTag("accounts");
  revalidateTag("accounts-active");
  return response;
};

export { checkLogin, register };
