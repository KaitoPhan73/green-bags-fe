import { useMutation, useQuery } from "react-query";
import { API_ENDPOINTS } from "./api-endpoint";
import http from "../config/http";
import axios from "axios";
import { toast } from "react-toastify";

const addressApi = "https://api.mysupership.vn/v1/partner/areas/";
//GET PROVINCE FUNCTION
const getProvince = async () => {
  const { data } = await axios.get(addressApi + "province");
  console.log("query province:", data.results);
  return data.results;
};
//GET PROVINCE QUERY BY USE GET PROVINCE FUNCTION
export const useGetProvince = () => {
  const { data, isLoading, isFetching, error } = useQuery(
    "province",
    getProvince
  );
  const provinces = data
    ? data.map((item) => ({
        value: item.code,
        label: item.name,
      }))
    : [];
  return { provinces, isLoading, isFetching, error };
};

//GET DISTRICT FUNCTION
const getDistrict = async (id) => {
  const { data } = await axios.get(addressApi + "district?province=" + id);
  console.log("query district:", data.results);
  return data.results;
};
//GET DISTRICT QUERY BY USE GET DISTRICT FUNCTION
export const useGetDistrict = (id) => {
  const { data, isLoading, isFetching, error } = useQuery(
    ["userDistrict", id],
    () => getDistrict(id)
  );
  console.log("check district:", data);
  const districts = data
    ? data.map((item) => ({
        value: item.code,
        label: item.name,
      }))
    : [];
  return { districts, isLoading, isFetching, error };
};

//GET WARD FUNCTION
const getWard = async (id) => {
  console.log("get ward:", id);
  const { data } = await axios.get(addressApi + "commune?district=" + id);
  console.log("query Ward:", data.results);
  return data.results;
};
//GET WARD QUERY BY USE GET WARD FUNCTION
export const useGetWard = (id) => {
  const { data, isLoading, isFetching, error } = useQuery(
    ["userWard", id],
    () => getWard(id)
  );
  console.log("check ward:", data);
  const wards = data
    ? data.map((item) => ({
        value: item.code,
        label: item.name,
      }))
    : [];
  return { wards, isLoading, isFetching, error };
};
