import apiClient from "@/service/client/apiClient";
import type { UpdatePasswordPayload, UpdateProfilePayload,  UserProfileResponse } from "./profile.types";
import { useMutation, useQuery } from "@tanstack/react-query";

const getUserProfile = async () => {
    const response = await apiClient<UserProfileResponse>('/profile');
    return response.data;
};

const updateUserProfile = async (data: UpdateProfilePayload): Promise<UserProfileResponse> => {
    const response = await apiClient<UserProfileResponse>('/profile', {
        method: 'PUT',
        data,
    });
    return response.data;
};

const updatePassword = async (paylod: UpdatePasswordPayload): Promise<UserProfileResponse> => {
    const response = await apiClient<UserProfileResponse>('/profile/password', {
        method: 'PUT',
        data: paylod,
    });
    return response.data;
};

const updateProfilePicture = async (data: FormData): Promise<UserProfileResponse> => {
    const response = await apiClient<UserProfileResponse>('/profile/picture', {
        method: 'PATCH',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
///////////////////////////////////////////////////////////

export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: getUserProfile,
    });
};

export const useUpdateUserProfile = () => {
    return useMutation({
        mutationFn: updateUserProfile,
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: updatePassword,
    });
};

export const useUpdateProfilePicture = () => {
    return useMutation({
        mutationFn: updateProfilePicture,
    });
};