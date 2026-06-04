export interface Episode {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  seriesId: string;
  seasonNumber: number;
  episodeNumber: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllEpisodesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Episode[];
}
