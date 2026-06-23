import apiClient from "@/service/client/apiClient";
import { useMutation } from "@tanstack/react-query";

export const resetPasswordService = async ({
	resetToken,
	password,
	comparedPassword
}: {
	resetToken: string|null;
	password: string;
	comparedPassword: string;
}) => {
	const response = await apiClient.post(
		`/auth/reset-password`,
		{
			resetToken,
			password,
			comparedPassword
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


export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPasswordService
  });
};

