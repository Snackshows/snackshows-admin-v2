import apiClient from "@/service/client/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetAllEmployeesResponse, EmployeeData, GetNewEmployeeDataResponse } from "./staffManagement.types";

const getAllEmployees = async () => {
  const response = await apiClient.get<GetAllEmployeesResponse>("/employee");
  console.log(response.data.data.employees)
  return response.data.data.employees
}

const getEmployeeById = async (id: string) => {
  const response = await apiClient.get<{ data: EmployeeData }>(`/employee/${id}`);
  return response.data.data;
}

const addNewEmployee = async (data: any) => {
  const response = await apiClient.post("/employee/create", data);
  return response.data;
}

const getNewEmployeeData = async () => {
  const response = await apiClient.get<GetNewEmployeeDataResponse>("/employee/create");
  return response.data
}

const deleteEmployee = async (employeeId: string) => {
  const response = await apiClient.delete(`/employee/${employeeId}`);
  return response.data;
}

const updateEmployee = async(payload: {
  id: string
  name: string;
  email: string;
  phone: string;
  role: number;
  bio: string;
  password: string;
  isBlocked: boolean;
}) => {
  const response = await apiClient.put(`/employee`, payload);
  return response.data;
}
///Api function
export const useGetEmployeesQuery = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployees()
  });
};

export const useGetEmployeeByIdQuery = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: enabled
  });
};

export const useGetNewEmployeeDataQuery = () => {
  return useQuery({
    queryKey: ["newEmployeeData"],
    queryFn: getNewEmployeeData
  });
};

export const useAddNewEmployeeMutation = () => {
  return useMutation({
    mutationFn: (data: any) => addNewEmployee(data)
  });
};

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationFn: deleteEmployee
  });
};

export const useUpdateEmployeeMutation = () => {
  return useMutation({
    mutationFn: updateEmployee
  });
};