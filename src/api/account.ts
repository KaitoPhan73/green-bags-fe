"use server";

import { httpBag } from "@/lib/http";
import { TAccountResponse } from "@/schema/account.schema";
import { TTableResponse } from "@/types/Table";

// Lấy tất cả tài khoản
const getAllAccounts = async (accessToken: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return response;
};

const getAllAccountsActive = async (
  accessToken: string,
  params?: any
): Promise<TTableResponse<TAccountResponse>> => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account/account-status-active",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return response.payload;
};

// Lấy tài khoản theo ID
const getAccountById = async (id: string): Promise<TAccountResponse> => {
  const response = await httpBag.get<TAccountResponse>(`/account/${id}`);
  return response.payload;
};

// Export các hàm API
export { getAllAccounts, getAccountById, getAllAccountsActive };
