"use server";

import { httpBag } from "@/lib/http";
import { TAccountResponse } from "@/schema/account.schema";
import { TTableResponse } from "@/types/Table";

// Lấy tất cả tài khoản
const getAllAccounts = async (): Promise<TTableResponse<TAccountResponse>> => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account"
  );
  return response.payload;
};

const getAllAccountsActive = async (): Promise<
  TTableResponse<TAccountResponse>
> => {
  const response = await httpBag.get<TTableResponse<TAccountResponse>>(
    "/account/account-status-active"
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
