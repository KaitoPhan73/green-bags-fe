import { useMutation, useQuery } from "react-query";
import { API_ENDPOINTS } from "../api-endpoint";
import http from "../../config/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//GET USER PROFILE FUNCTION
const getUserProfile = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_USER);
  console.log("query user profile:", data);
  if (data.data.verify === 2) {
    window.location.href = "/reject";
    document.cookie = "auth_token=; Max-Age=0; path=/";
  } else {
    return data.data;
  }
};
//GET USER PROFILE MUTATION BY USE GET USER PROFILE FUNCTION
export const useGetUserProfile = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "user",
    getUserProfile
  );

  return { data, isLoading, isFetching, error, refetch };
};

//UPDATE USER FUNCTION
async function updateUser(input) {
  console.log("update user input:", input);
  const { data } = await http.patch(API_ENDPOINTS.UPDATE_USER, input);
  console.log("update user:", data);

  return data;
}

//ADD WISHLIST MUTATION BY USE ADD WISHLIST FUNCTION
export const useUpdateUser = () => {
  return useMutation(async (input) => await updateUser(input), {
    onSuccess: () => {
      toast.success("Update user successfully");
    },
    onError: (error) => {
      console.log(error, "update user fail");
      toast.error("Update User fail");
    },
  });
};

//GET ALL USER FUNCTION
const getAllUser = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_ALL_USERS);
  console.log("query user profile:", data);
  return data.data;
};
//GET ALL USER MUTATION BY USE GET ALL PROFILE FUNCTION
export const useAllUser = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "all_user",
    getAllUser
  );

  return { data, isLoading, isFetching, error, refetch };
};

// UPDATE USER FUNCTION FOR BANNING
async function banUser(userId) {
  console.log("Ban user with ID:", userId);
  const { data } = await http.put(API_ENDPOINTS.BAN_USER + userId);
  console.log("Ban user response:", data);

  return data;
}

// BAN USER MUTATION USING BAN USER FUNCTION
export const useBanUser = () => {
  return useMutation(async (userId) => await banUser(userId), {
    onSuccess: () => {
      toast.success("User banned successfully");
    },
    onError: (error) => {
      console.error(error, "Ban user failed");
      toast.error("Ban user failed");
    },
  });
};

// UNBAN USER FUNCTION
async function unbanUser(userId) {
  console.log("Unban user with ID:", userId);
  const { data } = await http.put(API_ENDPOINTS.UNBAN_USER + userId); // Assuming there's a specific endpoint for unbanning
  console.log("Unban user response:", data);

  return data;
}

// UNBAN USER MUTATION USING UNBAN USER FUNCTION
export const useUnbanUser = () => {
  return useMutation(async (userId) => await unbanUser(userId), {
    onSuccess: () => {
      toast.success("User unbanned successfully");
    },
    onError: (error) => {
      console.error(error, "Unban user failed");
      toast.error("Unban user failed");
    },
  });
};
