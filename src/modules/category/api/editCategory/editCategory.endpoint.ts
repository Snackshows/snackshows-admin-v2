import apiClient from "@/service/client/apiClient";

import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetCategoryDetailsResponse } from "./editCategory.transform";

const getCategoryDetails = async (categoryId: string) => {
  const response = await apiClient.get<GetCategoryDetailsResponse>(`/category/${categoryId}`);
  console.log(response.data)
  return response.data
}

const editCategory = async (payload: FormData): Promise<{
  statusCode: number,
  message: string,
  success: boolean,
  errors: null
}> => {
  const response = await apiClient.post("/category/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

/////////////////////////////////////////////////

export const useGetCategoryDetailsQuery = (categoryId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryDetails(categoryId),
    ...options
  });
};

export const useEditCategoryMutation = () => {
  return useMutation({
    mutationKey: ["editCategory"],
    mutationFn: editCategory
  });
};
