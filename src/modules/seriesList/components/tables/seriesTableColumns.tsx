import { Button } from "@/components/ui/button"
import { TaskEdit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Series } from "../../api/seriesManagement/seriesManagement.types"

export const seriesTableColumns: ColumnDef<Series>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "uniqueId",
    header: "Unique ID",
  },
  {
    accessorKey: "isActive",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "id",
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
