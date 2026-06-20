import apiClient from "@/service/client/apiClient";
import type { GetAllCategoriesResponse } from "./categoryManagement.types";
import { useMutation, useQuery} from "@tanstack/react-query";


// const queryClient = useQueryClient();
const getAllCategory = async ()=>{
  const response = await apiClient.get<GetAllCategoriesResponse>("/category");
  console.log(response.data.data)
  return response.data.data
}

const deleteCategory = async (categoryId: string) => {
  const response = await apiClient.delete(`/category/${categoryId}`);
  return response.data;
}

/////////////////////////////////////////////////

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategory()
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId)
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["categories"],
    //   });
    // },
  });
};
