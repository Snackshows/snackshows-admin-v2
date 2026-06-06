

import { Button } from "@/components/ui/button"
import { TaskEdit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const userTableColumns: ColumnDef<any>[] = [
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
    cell: () => {
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