import { Button } from "@/components/ui/button";
import { TaskEdit02Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";

export const paymentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.currency;
      return `${currency} ${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        completed: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
        pending: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium",
        failed: "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium",
        refunded: "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium",
      };
      return (
        <span className={statusColors[status] || "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-2 justify-center">
          <Button size="sm" variant="outline">
            <HugeiconsIcon icon={TaskEdit02Icon} />
          </Button>
          <Button size="sm" variant="outline">
            <HugeiconsIcon icon={Delete01Icon} />
          </Button>
        </div>
      );
    },
  },
];
