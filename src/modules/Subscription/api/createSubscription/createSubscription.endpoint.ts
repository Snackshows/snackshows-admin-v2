import apiClient from "@/service/client/apiClient";
import type { CreateSubscriptionResponse } from "./createSubscription.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllSubscriptions = async () => {
  const response = await apiClient.get("/plans");
  console.log(response.data.data)
  return response.data.data
}

const createSubscription = async (payload: FormData): Promise<CreateSubscriptionResponse> => {
  const response = await apiClient.post("/plans/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

/////////////////////////////////////////////////

export const useGetSubscriptionsQuery = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => getAllSubscriptions()
  });
};

export const useCreateSubscriptionMutation = () => {
  return useMutation({
    mutationKey: ["createSubscription"],
    mutationFn: createSubscription
  });
};
