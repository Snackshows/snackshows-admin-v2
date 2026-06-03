import apiClient from "@/service/client/apiClient";

export const getUserData = async (): Promise<{
	id: number;
	name: string;
    email:string;
    phone:string;
    bio:string;
    image:string
}> => {
	const response = await apiClient(`/profile`);
	return response.data.data;
};