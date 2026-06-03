import apiClient from "@/service/client/apiClient";

export const loginService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const response = await apiClient.post(
		`/auth/login`,
		{
			email,
			password,
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