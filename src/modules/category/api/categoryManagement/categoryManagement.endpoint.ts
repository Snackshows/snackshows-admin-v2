import apiClient from "@/service/client/apiClient";
import type { GetAllCategoriesResponse } from "./categoryManagement.types";
import { useQuery } from "@tanstack/react-query";

const getAllCategory = async ()=>{
  const response = await apiClient.get<GetAllCategoriesResponse>("/category");
  console.log(response.data.data)
  return response.data.data
}

/////////////////////////////////////////////////

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategory()
  });
};