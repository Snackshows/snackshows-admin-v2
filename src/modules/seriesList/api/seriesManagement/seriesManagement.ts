export interface CreateSeriesData {
    categories: {
        id: string;
        name: string;
    }[];
    languagesData: {
        id: string;
        name: string;
    }[];
}

export interface GetCreateSeriesDataResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: CreateSeriesData;
}