export interface CreateSeriesData {
   categories: { 
                id: string;
                name: string;
            }[];
   languages: { 
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