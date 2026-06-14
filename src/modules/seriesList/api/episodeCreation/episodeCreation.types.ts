export interface EpisodeCreationResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: {
        id: string;
        seriesId: string;
        episodeNumber: number;
        title: string;
        description: string;
        thumbnail: string | null;
        duration: string | null;
        publishedAt: string | null;
        isPaid: boolean;
        isLocked: boolean;
        releaseDate: string;
        createdAt: string;
        updatedAt: string;
    }
}






export interface UploadPresignedUrlResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: {
        uploadUrl: string;
        publicS3Url: string;
        key: string;
    }
}