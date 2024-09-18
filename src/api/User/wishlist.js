

import { useMutation, useQuery } from "react-query";
import http from "../../config/http";
import { API_ENDPOINTS } from "../api-endpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//GET WISHLIST FUNCTION

const getWishlist = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_WISHLIST);
  console.log("query wishlist:", data);
  return data.data.products;
};
//GET WISHLIST MUTATION BY USE GET WISHLIST FUNCTION
export const useGetWishlist = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "wishlist",
    getWishlist
  );
  return { data, isLoading, error, isFetching, refetch };
};

//ADD WISHLIST FUNCTION
async function addWishlist(id) {
  const { data } = await http.post(API_ENDPOINTS.ADD_WISHLIST + id);
  console.log("add wishlist:", data);

  return data;
}

//ADD WISHLIST MUTATION BY USE ADD WISHLIST FUNCTION
export const useAddWishlist = () => {
  const navigate = useNavigate();
  return useMutation((id) => addWishlist(id), {
    onSuccess: () => {
      toast.success("Add to wishlist successfully");
    },
    onError: (error) => {
      if (error?.response.status === 401) {
        toast.error("Please login to add wishlist");
        navigate("/login");
      } else {
        toast.error("Add to wishlist failed");
      }
    },
  });
};

//ADD WISHLIST FUNCTION
async function deleteWishlistItem(id) {
    const { data } = await http.delete(API_ENDPOINTS.DELETE_WISHLIST_ITEM + id);
    console.log("delete wishlist:", data);
  
    return data;
  }
  
  //ADD WISHLIST MUTATION BY USE ADD WISHLIST FUNCTION
  export const useDeleteAddWishlistItem = () => {
    const navigate = useNavigate();
    return useMutation((id) => deleteWishlistItem(id), {
      onSuccess: () => {
        toast.success("Delete item successfully");
      },
      onError: (error) => {
        if (error?.response.status === 401) {
          toast.error("Please login to delete wishlist");
          navigate("/login");
        } else {
          toast.error("Delete wishlist item is failed");
        }
      },
    });
  };