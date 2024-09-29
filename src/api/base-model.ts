import { httpBag } from "@/lib/http";
import {
  TCreateBaseModelRequest,
  TUpdateBaseModelRequest,
  TBaseModelResponse,
} from "@/schema/base-model.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả BaseModels
const getAllBaseModels = async (params?: any) => {
  return await httpBag.get<TTableResponse<TBaseModelResponse>>(`/base-model`, {
    params,
    next: { tags: ["base-models"] },
  });
};

// Lấy tất cả BaseModels đang active
const getAllBaseModelsActive = async (params?: any) => {
  return await httpBag.get<TTableResponse<TBaseModelResponse>>(
    `/base-model/active`,
    {
      params,
      next: { tags: ["base-models-active"] },
    }
  );
};

// Lấy BaseModel theo ID
const getBaseModelById = async (id: string) => {
  return await httpBag.get<TBaseModelResponse>(`/base-model/${id}`);
};

// Tạo mới BaseModel
const createBaseModel = async (body: TCreateBaseModelRequest) => {
  const result = await httpBag.post<TBaseModelResponse>(
    "/base-model/create",
    body
  );
  revalidateTag("base-models");
  revalidateTag("base-models-active");
  return result;
};

// Cập nhật BaseModel
const updateBaseModel = async (body: TUpdateBaseModelRequest) => {
  const result = await httpBag.post<TBaseModelResponse>(
    "/base-model/update",
    body
  );
  revalidateTag("base-models");
  revalidateTag("base-models-active");
  return result;
};

// Xóa BaseModel
const deleteBaseModel = async (id: string): Promise<void> => {
  await httpBag.delete(`/base-model/${id}`);
  revalidateTag("base-models");
  revalidateTag("base-models-active");
};

export {
  getAllBaseModels,
  getAllBaseModelsActive,
  getBaseModelById,
  createBaseModel,
  updateBaseModel,
  deleteBaseModel,
};
