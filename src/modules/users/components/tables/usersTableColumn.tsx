

import { Button } from "@/components/ui/button"
import { TaskEdit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { UserData } from "../../api/userManagement/userManagement.types"

export const userTableColumns: ColumnDef<UserData>[] = [
  {
    accessorKey: "status",
    header: "No",
  },
  {
    accessorKey: "email",
    header: "UserName",
  },
  {
    accessorKey: "amount",
    header: "Login Type",
  },
  {
    accessorKey: "uniqueId",
    header: "Unique ID",
  },
  {
    accessorKey: "uniqueId",
    header: "Subscription",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Login",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "createdAt",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div>
          <Button><HugeiconsIcon icon={TaskEdit02Icon} /></Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      )
    },
  },
]