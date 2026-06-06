export interface Payment {
  id: string;
  transactionId: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPaymentsResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Payment[];
}
