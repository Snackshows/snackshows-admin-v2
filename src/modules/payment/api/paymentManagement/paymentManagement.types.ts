
export interface PaymentOrder{
  userId: string;
  userName: string;
  avatar: string;
  planName: string;
  uniqueId: string;
  paymentGateway: string;
  currency: string;
  amount: number;
  status: 'INITIATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  createdAt: string;
  date: string;
}

export interface GetAllPaymentsResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: PaymentOrder[];
}
