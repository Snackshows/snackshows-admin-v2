import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllPaymentsResponse } from "./paymentManagement.types";



  const  getAllPayments = async () => {

 const response = await apiClient.get<GetAllPaymentsResponse>("/payments");
 const returnValue = response.data.data;

    return returnValue 
};

/////////////////////////////////////////////////

export const useGetPaymentsQuery = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => getAllPayments(),
  });
};
