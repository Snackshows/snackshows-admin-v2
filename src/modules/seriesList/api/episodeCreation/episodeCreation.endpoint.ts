import apiClient from "@/service/client/apiClient";
import { useMutation } from "@tanstack/react-query";

const addNewEpisode = async (payload: FormData) => {
  const response = await apiClient.post("/episode/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
}



///////////////////////////////////////////////////////////

export const useAddNewEpisodeMutation = () => {
  return useMutation({
    mutationKey: ["add-new-episode"],
    mutationFn: addNewEpisode
  });
}
