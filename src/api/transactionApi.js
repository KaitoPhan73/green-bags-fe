import { toast } from "react-toastify";
import http from "../config/http";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "./api-endpoint";

// Define the API endpoint for image upload
// Define the API endpoint for image upload, with placeholder for the id
const IMAGE_UPLOAD_ENDPOINT = (id) => `/transactions/${id}/image`;

// Function to upload image
const uploadImage = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("image", file);

  // Ensure the URL is correctly constructed with the id
  const endpoint = IMAGE_UPLOAD_ENDPOINT(id);
  console.log("Uploading to endpoint:", endpoint);

  const { data } = await http.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// React Query mutation for image upload
export const useUploadImage = () => {
  return useMutation(
    async ({ id, file }) => {
      const data = await uploadImage({ id, file });
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Image uploaded successfully.");
      },
      onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image.");
      },
    }
  );
};
