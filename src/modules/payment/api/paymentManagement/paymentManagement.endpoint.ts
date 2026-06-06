import { useQuery } from "@tanstack/react-query";

// Mock data for development - replace with actual API call
const getAllPayments = async () => {
  // Uncomment this when API is ready
  // import apiClient from "@/service/client/apiClient";
  // import type { GetAllPaymentsResponse } from "./paymentManagement.types";
  // const response = await apiClient.get<GetAllPaymentsResponse>("/payments");
  // return response.data.data;

  // Mock data for now
  const mockPayments = [
    {
      id: "1",
      transactionId: "TXN001",
      userId: "user1",
      userName: "John Doe",
      amount: 29.99,
      currency: "USD",
      status: "completed" as const,
      paymentMethod: "Credit Card",
      description: "Premium subscription",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      transactionId: "TXN002",
      userId: "user2",
      userName: "Jane Smith",
      amount: 49.99,
      currency: "USD",
      status: "completed" as const,
      paymentMethod: "PayPal",
      description: "Annual subscription",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-14T14:20:00Z",
    },
    {
      id: "3",
      transactionId: "TXN003",
      userId: "user3",
      userName: "Bob Johnson",
      amount: 19.99,
      currency: "USD",
      status: "pending" as const,
      paymentMethod: "Credit Card",
      description: "Monthly subscription",
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T09:15:00Z",
    },
    {
      id: "4",
      transactionId: "TXN004",
      userId: "user4",
      userName: "Alice Williams",
      amount: 99.99,
      currency: "USD",
      status: "failed" as const,
      paymentMethod: "Debit Card",
      description: "Premium subscription",
      createdAt: "2024-01-12T16:45:00Z",
      updatedAt: "2024-01-12T16:45:00Z",
    },
    {
      id: "5",
      transactionId: "TXN005",
      userId: "user5",
      userName: "Charlie Brown",
      amount: 39.99,
      currency: "USD",
      status: "refunded" as const,
      paymentMethod: "PayPal",
      description: "Quarterly subscription",
      createdAt: "2024-01-11T11:00:00Z",
      updatedAt: "2024-01-11T11:00:00Z",
    },
  ];

  return mockPayments;
};

/////////////////////////////////////////////////

export const useGetPaymentsQuery = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => getAllPayments(),
  });
};
