
export interface UserProfileResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: {
        name: string;
        email: string;
        phone: string;
        bio: string;
        image: string | null;
    }
}

export interface UpdateProfilePayload {
    
    name: string;
    email: string;
    phone: string;
    bio: string;
   
}


export interface UpdatePasswordPayload {
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
}
