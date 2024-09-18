import { useMutation, useQuery } from "react-query";
import { API_ENDPOINTS } from "./api-endpoint";
import http from "../config/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.ALL_PRODUCT);
  // console.log("query product:", data);
  return data.data;
};

export const useGetProducts = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "products",
    getProducts
  );
  return { data, isLoading, error, isFetching, refetch };
};

//GET PRODUCT BY ID
const getProductById = async (id) => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCT_DETAIL + id);
  console.log("query product by id:", data);
  return data.data;
};

export const useGetProductById = (id) => {
  const { data, isLoading, error } = useQuery(["product", id], () =>
    getProductById(id)
  );
  return { data, isLoading, error };
};

//GET MATERIALS
const getMaterials = async () => {
  const { data } = await http.get(API_ENDPOINTS.ALL_MATERIAL);
  console.log("query materials:", data);
  return data.data;
};

export const useGetMaterials = () => {
  const { data, isLoading, error } = useQuery("materials", getMaterials);
  const materials = data
    ? data.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    : [];
  return { materials, isLoading, error };
};

//GET COLLECTIONS
const getCollections = async () => {
  const { data } = await http.get(API_ENDPOINTS.ALL_COLLECTION);
  console.log("query collections:", data);
  return data.data;
};

export const useGetCollections = () => {
  const { data, isLoading, error } = useQuery("collections", getCollections);
  const collections = data
    ? data.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    : [];
  return { collections, isLoading, error };
};

// ADD PRODUCT FUNCTION
async function addProduct(input) {
  console.log("add product input:", input);
  const { data } = await http.post(API_ENDPOINTS.ADD_PRODUCT, input);
  console.log("add product:", data);

  return data;
}

// ADD PRODUCT MUTATION BY USE ADD PRODUCT FUNCTION
export const useAddProduct = () => {
  return useMutation(async (input) => await addProduct(input), {
    onSuccess: () => {
      toast.success("Add product successfully");
    },
    onError: (error) => {
      console.log(error, "add product fail");
      toast.error("Add product fail");
    },
  });
};

// EDIT PRODUCT FUNCTION
async function editProduct(id, input) {
  console.log("edit product input:", input);
  const { data } = await http.patch(
    `${API_ENDPOINTS.PRODUCT_DETAIL}/${id}`,
    input
  );
  console.log("edit product:", data);

  return data;
}

// EDIT PRODUCT MUTATION BY USE EDIT PRODUCT FUNCTION
export const useEditProduct = () => {
  return useMutation(async ({ id, input }) => await editProduct(id, input), {
    onSuccess: () => {
      toast.success("Edit product successfully");
    },
    onError: (error) => {
      console.log(error, "edit product fail");
      toast.error("Edit product fail");
    },
  });
};

// DELETE PRODUCT FUNCTION
async function deleteProduct(id) {
  const { data } = await http.delete(API_ENDPOINTS.PRODUCT_DETAIL + id);
  console.log("delete product:", data);

  return data;
}

// DELETE PRODUCT MUTATION BY USE DELETE PRODUCT FUNCTION
export const useDeleteProduct = () => {
  const navigate = useNavigate();
  return useMutation((id) => deleteProduct(id), {
    onSuccess: () => {
      toast.success("Delete product successfully");
      // Optionally, navigate to a different page after successful deletion
      // navigate("/products");
    },
    onError: (error) => {
      if (error?.response.status === 401) {
        toast.error("Please login to delete product");
        navigate("/login");
      } else {
        toast.error("Delete product failed");
      }
    },
  });
};
