export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  image: string | null;
  role: number;
  isBlocked: boolean;
  createdAt: string;
  joiningDate: string;
  isBan: boolean;
}

export interface EmployeesData {
  totalEmployee: number;
  activeEmployee: number;
  inactiveEmployee: number;
  employees: EmployeeData[];
}

export interface GetAllEmployeesResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: EmployeesData;
}

export interface GetNewEmployeeDataResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    roles: {
      id: number;
      name: string;
    }[];
  };
}