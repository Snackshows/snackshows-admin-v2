import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllEmployeesResponse, EmployeeData } from "./staffManagement.types";

const getAllEmployees = async () => {
  const response = await apiClient.get<GetAllEmployeesResponse>("/employee");
  console.log(response.data.data.employees)
  return response.data.data.employees
}

const getEmployeeById = async (id: string) => {
  const response = await apiClient.get<{ data: EmployeeData }>(`/employee/${id}`);
  return response.data.data;
}

///Api function
export const useGetEmployeesQuery = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployees()
  });
};

export const useGetEmployeeByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id
  });
};