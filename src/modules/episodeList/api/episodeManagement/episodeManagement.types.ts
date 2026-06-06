export interface Series {
  id: string;
  name: string;
}

export interface Episode {
  id: string;
  series: Series;
  title: string;
  description: string;
  episodeNumber: number;
  thumbnail: string;
  videoUrl: string;
  status: string;
  duration: number;
  isLocked: boolean;
  releaseDate: string;
}

export interface GetAllEpisodesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Episode[];
}
