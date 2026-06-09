

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskEdit02Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from "../../api/categoryManagement/categoryManagement.types"
import { EditCategoryDialog } from "../dialogs/EditCategoryDialog"


export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "serial",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "uniqueId",
    header: "Unique ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-12 h-12 object-cover rounded"
        />
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.isActive
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
          }`}>
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString()
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isEditOpen, setIsEditOpen] = useState(false)

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsEditOpen(true)}>
            <HugeiconsIcon icon={TaskEdit02Icon} />
          </Button>

          <EditCategoryDialog
            category={row.original}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSave={(updatedCategory) => {
              console.log("Save category:", updatedCategory)
              setIsEditOpen(false)
            }}
          />

          <Button size="sm" variant="outline">
            <HugeiconsIcon icon={Delete02Icon} />
          </Button>
        </div >
      )
    },
  },
]