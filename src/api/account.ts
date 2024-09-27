"use server";

import { httpBag } from "@/lib/http";
import { TAccountResponse } from "@/schema/account.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả tài khoản
const getAllAccounts = async (accessToken: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
      next: { tags: ["accounts"] },
    }
  );
  return response;
};

const getAllAccountsActive = async (accessToken: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account/account-status-active",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
      next: { tags: ["accounts-active"] },
    }
  );
  return response;
};

// Lấy tài khoản theo ID
const getAccountById = async (id: string): Promise<TAccountResponse> => {
  const response = await httpBag.get<TAccountResponse>(`/account/${id}`, {
    next: { tags: ["accounts"] },
  });
  return response.payload;
};

// Export các hàm API
export { getAllAccounts, getAccountById, getAllAccountsActive };
