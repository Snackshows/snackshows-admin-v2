export interface Category {
  id: string;
  name: string;
}

export interface Series {
  id: string;
  name: string;
  description: string;
  banner: string;
  thumbnail: string;
  views: number;
  releaseDate: string;
  isTrending: boolean;
  isAutoAnimateBanner: boolean;
  isActive: boolean;
  createdDate: string;
  language: string;
  category: Category[];
  totalEpisodes: string;
}

export interface GetAllSeriesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Series[];
}

/////

export interface GetSeriesDetailsResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: SeriesDetails
}

export interface SeriesDetails {
    id: string;
    name: string;
    description: string;
    banner: string;
    thumbnail: string;
    views: number;
    releaseDate: string;
    isTrending: boolean;
    isAutoAnimateBanner: boolean;
    isActive: boolean;
    createdDate: string;
    language: string;
    category: Category[];
    totalShortVideos: string;
}