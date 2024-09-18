import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./api-endpoint";
import http from "../config/http";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCartStore } from "../zustand-store/cartState";
import { useOrderNavState } from "../zustand-store/OrderNavState";

//GET ALL ORDERS
const getAllOrders = async () => {
  const { data } = await http.get(API_ENDPOINTS.ORDERS);
  return data.data;
};

//GET ALL ORDERS BY USE GET ALL ORDERS
export const useGetAllOrders = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "adminOrders",
    getAllOrders
  );
  // console.log("check addresses:", data);
  return { data, isLoading, isFetching, error, refetch };
};

//MAKE ORDER FUNCTION
const makeOrder = async (input) => {
  console.log(input, "order input");

  const { data } = await http.post(API_ENDPOINTS.ORDERS, input);
  console.log("login response", data);

  return data;
};

// ORDER MUTATION BY USE ORDER FUNCTION
export const useMakeOrder = () => {
  const { clearCart } = useCartStore((state) => state);
  const { complete } = useOrderNavState();
  return useMutation(
    async (input) => {
      const data = await makeOrder(input);
      return data;
    },
    {
      onSuccess: (data) => {
        toast.success("order success");
        clearCart();
        complete();
        console.log(data, "order success");
      },
      onError: (error) => {
        toast.error("order fail");
        console.log(error, "order fail");
      },
    }
  );
};

//Get Order by User
const getOrderByUser = async () => {
  const { data } = await http.get(API_ENDPOINTS.ORDER_BY_USER);
  return data.data;
};

//Use Get Order by User
export const useGetOrderByUser = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "userOrder",
    getOrderByUser
  );
  // console.log("check addresses:", data);
  return { data, isLoading, isFetching, error, refetch };
};

// UPDATE ORDER STATUS FUNCTION
const updateOrderStatus = async (orderId, input) => {
  const response = await http.patch(
    `${API_ENDPOINTS.CHANGE_ORDER_STATUS}${orderId}`,
    input
  );
  console.log("order status response", response);
  return response.data;
};

// USE ORDER STATUS MUTATION
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ orderId, input }) => await updateOrderStatus(orderId, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("adminOrders");

        toast.success("Order status updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update order status: ${error.message}`);
      },
    }
  );
};
