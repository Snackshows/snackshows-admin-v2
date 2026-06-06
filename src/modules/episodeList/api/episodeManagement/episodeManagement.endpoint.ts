import apiClient from "@/service/client/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetAllEpisodesResponse, Episode } from "./episodeManagement.types";

const getAllEpisodes = async () => {
  const response = await apiClient.get<GetAllEpisodesResponse>("/episode");
  return response.data.data;
}

export const useGetEpisodesQuery = () => {
  return useQuery({
    queryKey: ["episodes"],
    queryFn: () => getAllEpisodes()
  });
};

const updateEpisode = async (id: string, data: Partial<Episode>) => {
  const response = await apiClient.patch(`/episode/${id}`, data);
  return response.data;
}

export const useUpdateEpisodeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Episode> }) => updateEpisode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["episodes"] });
    },
  });
};
