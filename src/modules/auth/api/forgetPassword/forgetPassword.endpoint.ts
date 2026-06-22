import apiClient from "@/service/client/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const forgetPasswordService = async ({
	email,
}: {
	email: string;
}) => {
	const response = await apiClient.post(
		`/auth/forget-password`,
		{
			email
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};

////////////////////////////////////////////////////////////////////


export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: forgetPasswordService
  });
};

