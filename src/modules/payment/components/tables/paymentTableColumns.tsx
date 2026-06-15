import type { ColumnDef } from "@tanstack/react-table";
import type { PaymentOrder } from "../../api/paymentManagement/paymentManagement.types";
import { Badge } from "@/components/ui/badge";

export const paymentColumns: ColumnDef<PaymentOrder>[] = [

  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => {
      const userName = row.original.userName;
      const avatar = row.original.avatar;
      return (
        <div className="flex items-center gap-2">
          {avatar ? (
            <img src={avatar} alt={userName} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <span>{userName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "uniqueId",
    header: "Transaction ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.currency;
      return <div><b>{currency}</b> {amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "paymentGateway",
    header: "Payment Gateway",
    cell: ({ row }) => {
      const paymentGateway = row.original.paymentGateway;
      return <div>{paymentGateway}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;


      switch (status) {
        case "INITIATED": {
          return <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }
        case "PENDING": {
          return <Badge className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }
        case "SUCCESS": {
          return <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }
        case "FAILED": {
          return <Badge className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }
        case "REFUNDED": {
          return <Badge className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }
        default: {
          return <Badge className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </Badge>
        }

      }


    },
  },
  {
    accessorKey: "planName",
    header: "Plan",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  
];
