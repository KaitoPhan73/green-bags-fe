import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "../api-endpoint";
import http from "../../config/http";
import { notification } from "antd";

// POST CUSTOM BAG FUNCTION
export const postCustomBag = async ({ input, selectedColor }) => {
  let color = selectedColor.startsWith("#")
    ? selectedColor.substring(1)
    : selectedColor;
  const apiUrl = `${API_ENDPOINTS.POST_CUSTOM}/${color}`;
  const response = await http.post(apiUrl, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000,
  });
  console.log("noooooooooo", response);
  return response.data.data;
};

export const usePostCustomBagMutation = (onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation(postCustomBag, {
    onSuccess: (data) => {
      console.log("Custom bag posted successfully:", data);
      onSuccess(data);
      queryClient.invalidateQueries("customBags");
      notification.success({
        message: "Success",
        description: "Custom bag posted successfully!",
      });
    },
    onError: (error) => {
      console.error("Failed to post custom bag:", error);
      onError(error);
      notification.error({
        message: "Error",
        description: "Failed to post custom bag. Please try again later.",
      });
    },
  });
};

// GET CUSTOM BAGS FUNCTION
const getCustom = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_CUSTOM);
  console.log("query custom bags:", data);
  return data.data;
};

// GET CUSTOM BAGS PUBLIC FUNCTION
const getCustomPublic = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_CUSTOM_PUBLIC);
  console.log("query custom bags:", data);
  return data.data;
};

// DELETE CUSTOM BAG FUNCTION
export const deleteCustomBag = async (customBagId) => {
  const { data } = await http.delete(
    `${API_ENDPOINTS.DEL_CUSTOM}/${customBagId}`
  );
  return data;
};

// PUBLIC CUSTOM FUNCTION
export const makeCustomPublic = async (customBagId) => {
  const { data } = await http.put(
    `${API_ENDPOINTS.REQUEST_PUBLIC}/${customBagId}`
  );
  return data;
};

export const useMakeCustomPublicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(makeCustomPublic, {
    onSuccess: (data) => {
      console.log(data, "make custom public success");
      queryClient.invalidateQueries("customBags");
      notification.success({
        message: "Success",
        description: "Custom made public successfully.",
      });
    },
    onError: (error) => {
      console.log(error.response.data.errors, "make custom public fail");
      notification.error({
        message: "Error",
        description: "Failed to make custom public. Please try again later.",
      });
    },
  });
};

// Assuming http is imported correctly and API_ENDPOINTS is defined
export const updateCustomName = async ({ customBagId, name }) => {
  const { data } = await http.put(
    `${API_ENDPOINTS.PUT_CUSTOM_NAME}${customBagId}`,
    { name }
  );
  return data;
};
export const useUpdateCustomNameMutation = (onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation(updateCustomName, {
    onSuccess: (data) => {
      console.log(data, "update custom name public success");
      onSuccess(data);
      queryClient.invalidateQueries("customBags");
      notification.success({
        message: "Success",
        description: "Update custom name successfully.",
      });
    },
    onError: (error) => {
      console.log(error.response.data.errors, "Update custom name fail");
      onError(error);
      notification.error({
        message: "Error",
        description: "Failed to update custom name. Please try again later.",
      });
    },
  });
};

// GET CUSTOM BAGS HOOK USING REACT-QUERY
export const useGetCustom = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "customBags",
    getCustom
  );

  return { data, isLoading, isFetching, error, refetch };
};

// GET CUSTOM BAGS HOOK USING REACT-QUERY
export const useGetCustomPublic = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "customBags",
    getCustomPublic
  );

  return { data, isLoading, isFetching, error, refetch };
};

//GET ALL CUSTOM BAG FUNCTION
const getAllCustomBags = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_ALL_CUSTOM);
  return data.data;
};

//USE GET ALL CUSTOM BAGS HOOK
export const useGetAllCustomBags = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "allCustomBags", // Unique key for the query
    getAllCustomBags // The function defined above to fetch data
  );

  return { data, isLoading, isError, error, refetch };
};

// PUBLIC CUSTOM FUNCTION
async function acceptCustomPublic(customBagId) {
  const { data } = await http.put(
    API_ENDPOINTS.ACCEPT_CUSTOM_PUBLIC + customBagId
  );
  return data;
}

export const useAcceptCustomPublicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => acceptCustomPublic(id), {
    onSuccess: (data) => {
      console.log(data, "make custom public success");
      queryClient.invalidateQueries("allCustomBags");
      notification.success({
        message: "Success",
        description: "Custom made public successfully.",
      });
    },
    onError: (error) => {
      console.log(error.response.data.errors, "make custom public fail");
      notification.error({
        message: "Error",
        description: "Failed to make custom public. Please try again later.",
      });
    },
  });
};
