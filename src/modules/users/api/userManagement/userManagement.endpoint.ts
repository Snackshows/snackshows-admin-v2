import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllUsersResponse, UserData } from "./userManagement.types";
const getAllUsers = async () => {
  const response = await apiClient.get<GetAllUsersResponse>("/users");
  console.log(response.data.data.user)
  return response.data.data.user
}

const getUserById = async (id: string) => {
  const response = await apiClient.get<{ data: UserData }>(`/users/${id}`);
  return response.data.data;
}

///Api function
export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers()
  });
};

export const useGetUserByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id
  });
};