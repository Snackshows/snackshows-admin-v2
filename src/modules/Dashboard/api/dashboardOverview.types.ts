export interface Stats {
  totalUsers: number;
  totalCategory: number;
  totalSeries: number;
  totalVideos: number;
  totalRevenue: number;
}

export interface LatestUser {
  id: string;
  name: string;
  email: string;
}

export interface LatestVideo {
  id: string;
  thumbnail: string;
}

export interface DashboardOverviewData {
  stats: Stats;
  latestUsers: LatestUser[];
  latestVideos: LatestVideo[];
}

export interface DashboardOverviewResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: DashboardOverviewData;
}
