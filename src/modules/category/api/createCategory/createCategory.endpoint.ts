import apiClient from "@/service/client/apiClient";
import type { GetAllCategoriesResponse } from "./createCategory.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllCategory = async () => {
  const response = await apiClient.get<GetAllCategoriesResponse>("/category");
  console.log(response.data.data)
  return response.data.data
}

const createCategory = async (payload: FormData): Promise<{
  statusCode: number,
  message: string,
  success: boolean,
  errors: null
}> => {
  const response = await apiClient.post("/category/create",payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

/////////////////////////////////////////////////

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategory()
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createCategory
  });
};
