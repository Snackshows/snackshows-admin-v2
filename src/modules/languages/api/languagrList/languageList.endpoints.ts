import apiClient from "@/service/client/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAllLanguagesData = async () => {
  const response = await apiClient.get("/language");
  return response.data;
};

const createLanguage = async (payload:{
    "name": string,
    "isActive":boolean
}) => {
  const response = await apiClient.post("/language", payload);
  return response.data;
};


const updateLanguage = async (payload:{
    "name": string,
    "isActive":boolean
}) => {
  const response = await apiClient.put("/language", payload);
  return response.data;
};

const deleteLanguage = async (languageId: string) => {
  const response = await apiClient.delete(`/language/${languageId}`);
  return response.data;
};


///////////////

export const useGetAllLanguagesDataQuery = () => {
  return useQuery({
    queryKey: ["allLanguagesData"],
    queryFn: () => getAllLanguagesData()
  });
};

export const useCreateLanguageMutation = () => {
  return useMutation({
    mutationKey: ["createLanguage"],
    mutationFn: (payload: { name: string; isActive: boolean }) => createLanguage(payload)
  });
};

export const useUpdateLanguageMutation = () => {
  return useMutation({
    mutationKey: ["updateLanguage"],
    mutationFn: (payload: { name: string; isActive: boolean }) => updateLanguage(payload)
  });
};

export const useDeleteLanguageMutation = () => {
  return useMutation({
    mutationKey: ["deleteLanguage"],
    mutationFn: (languageId: string) => deleteLanguage(languageId)
  });
};
 
