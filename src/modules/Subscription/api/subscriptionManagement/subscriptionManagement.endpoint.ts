import apiClient from "@/service/client/apiClient";
import type { GetAllSubscriptionsResponse } from "./subscriptionManagement.types";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllSubscriptions = async () => {
  const response = await apiClient.get<GetAllSubscriptionsResponse>("/subscription/plan");
  console.log(response.data.data)
  return response.data.data
}

const deleteSubscription = async (subscriptionId: string) => {
  const response = await apiClient.delete(`/plans/${subscriptionId}`);
  return response.data;
}

/////////////////////////////////////////////////

export const useGetSubscriptionsQuery = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => getAllSubscriptions()
  });
};

export const useDeleteSubscriptionMutation = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) => deleteSubscription(subscriptionId)
  });
};
