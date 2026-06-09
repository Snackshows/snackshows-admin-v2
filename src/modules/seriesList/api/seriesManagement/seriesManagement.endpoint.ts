import apiClient from "@/service/client/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetAllSeriesResponse } from "./seriesManagement.types";
import type { GetCreateSeriesDataResponse } from "./seriesManagement";

const getAllSeries = async () => {
  const response = await apiClient.get<GetAllSeriesResponse>("/videoSeries");
  return response.data.data;
}

const getCreateSeriesData = async () => {
  const response = await apiClient.get<GetCreateSeriesDataResponse>("/videoSeries/create");
  return response.data;
}
const getCreateSeriesDataSubmit = async (data: any) => {
  const response = await apiClient.post("/videoSeries/create", data);
  return response.data;
}

export const useGetSeriesQuery = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: () => getAllSeries()
  });
};

export const useGetCreateSeriesDataQuery = () => {
  return useQuery({
    queryKey: ["create-series-data"],
    queryFn: () => getCreateSeriesData()
  });
};

export const useGetCreateSeriesDataSubmitMutation = () => {
  return useMutation({
    mutationKey: ["create-series-data-submit"],
    mutationFn: (data: any) => getCreateSeriesDataSubmit(data)
  });
};
