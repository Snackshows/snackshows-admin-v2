import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllUsersResponse } from "./userManagement.types";




const getAllUsers = async ()=>{
  const response = await apiClient.get<GetAllUsersResponse>("/users");
  console.log(response.data.data.user)
  return response.data.data.user
}


///Api function
export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers()
  });
};