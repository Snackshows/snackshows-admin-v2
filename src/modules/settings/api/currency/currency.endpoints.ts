import { useQuery } from "@tanstack/react-query";

import type { CurrencyResponse } from "./currency.types";
import apiClient from "@/service/client/apiClient";

const getAllCurrencies = async (): Promise<CurrencyResponse> => {
    const response = await apiClient.get<CurrencyResponse>("/settings/currency");
    return response.data;
};

export const useGetAllCurrencies = () => {
    return useQuery({
        queryKey: ["allCurrencies"],
        queryFn: () => getAllCurrencies(),
    });
};


