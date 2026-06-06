export interface UserData {
  id: string;
  name: string;
  age: number | null;
  gender: string | null;
  avatar: string;
  email: string;
  phoneNumber: string | null;
  isBlocked: boolean;
  joinedOn: string;
  role: string | null;
}

export interface UsersData {
  totalUsers: number;
  user: UserData[];
}

export interface GetAllUsersResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: UsersData;
}