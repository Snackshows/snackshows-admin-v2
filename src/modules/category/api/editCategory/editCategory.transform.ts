export interface GetCategoryDetailsResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: CategoryDetails;
}

export interface CategoryDetails {
        id: string;
        uniqueId: string;
        name: string;
        description: string;
        image: string;
        isActive: boolean;
        createdAt: string;
        totalSeries: string;
    }