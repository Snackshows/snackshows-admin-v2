import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllSeriesResponse } from "./seriesManagement.types";

const getAllSeries = async () => {
  const response = await apiClient.get<GetAllSeriesResponse>("/videoSeries");
  return response.data.data;
}

export const useGetSeriesQuery = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: () => getAllSeries()
  });
};
