import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { DashboardOverviewResponse } from "./dashboardOverview.types";

const getDashboardOverviewData = async () => {
  const response = await apiClient.get<DashboardOverviewResponse>("/info");
  return response.data;
}

export const useGetDashboardOverviewDataQuery = () => {
  return useQuery({
    queryKey: ["dashboardOverviewData"],
    queryFn: () => getDashboardOverviewData()
  });
};
