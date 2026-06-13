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
const createSeriesDataSubmit = async (payload: FormData) => {
  const response = await apiClient.post("/videoSeries/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}

const getSeriesDetails = async (seriesId: string) => {
  const response = await apiClient.get(`/videoSeries/${seriesId}`);
  return response.data;
}

///////////////////////////////////////////////////////////

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
    mutationFn: createSeriesDataSubmit
  });
};

export const useGetSeriesDetailsQuery = (seriesId: string) => {
  return useQuery({
    queryKey: ["series-details", seriesId],
    queryFn: () => getSeriesDetails(seriesId)
  });
};
