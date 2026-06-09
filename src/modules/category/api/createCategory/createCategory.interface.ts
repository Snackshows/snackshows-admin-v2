export interface Category {
    id: string;
    uniqueId: string;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    createdAt: string;
}

export interface GetAllCategoriesResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: Category[];
}