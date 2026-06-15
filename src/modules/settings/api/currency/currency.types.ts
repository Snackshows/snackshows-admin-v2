export interface CurrencyResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: CurrencyData[]
}

export interface CurrencyData {
    id: string;
    name: string;
    symbol: string;
    currencyCode: string;
    countryCode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
    totalSeries: string;
}
           