import apiClient from "@/service/client/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { GetAllEpisodesResponse } from "./episodeManagement.types";

const getAllEpisodes = async () => {
  const response = await apiClient.get<GetAllEpisodesResponse>("/episodes");
  return response.data.data;
}

export const useGetEpisodesQuery = () => {
  return useQuery({
    queryKey: ["episodes"],
    queryFn: () => getAllEpisodes()
  });
};
