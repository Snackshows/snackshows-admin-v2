export interface Series {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllSeriesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Series[];
}
