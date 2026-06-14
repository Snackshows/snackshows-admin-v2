import apiClient from "@/service/client/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { EpisodeCreationResponse } from "./episodeCreation.types";

const addNewEpisode = async (payload: FormData) => {
  const response = await apiClient.post("/episode/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data as EpisodeCreationResponse;
}

const getUploadPresignedUrl = async (payload: { episodeId: string, fileName: string, contentType: string }) => {
  const response = await apiClient.post("/episode/video/presign", payload);
  return response.data;
}

const uploadVideoToS3 = async (payload: { presignedUrl: string, file: File }) => {
  const response = await apiClient.put(payload.presignedUrl, payload.file, {
    headers: {
      "Content-Type": payload.file.type
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


export const useGetUploadPresignedUrlMutation = () => {
  return useMutation({
    mutationKey: ["get-upload-presigned-url"],
    mutationFn: getUploadPresignedUrl
  });
}


export const useUploadVideoToS3Mutation = () => {
  return useMutation({
    mutationKey: ["upload-video-to-s3"],
    mutationFn: uploadVideoToS3
  });
}
