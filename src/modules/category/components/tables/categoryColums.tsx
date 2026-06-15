


import { Button } from "@/components/ui/button"
import { TaskEdit02Icon, Delete02Icon, Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from "../../api/categoryManagement/categoryManagement.types"
import { EditCategoryDialog } from "../dialogs/EditCategoryDialog"
import { Badge } from "@/components/ui/badge"
import { useDeleteCategoryMutation } from "../../api/categoryManagement/categoryManagement.endpoint"
import toast from "react-hot-toast"


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
      const image = row.original.image
      const name = row.original.name 
      return (
        <img
          src={image}
          alt={name}
          className="w-12 h-12 object-cover rounded"
        />
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {


      if (!row.original.isActive) {
        return (
          <Badge variant="destructive">

            Inactive
          </Badge>
        )
      } else {
        return (
          <Badge className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      }

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
      const categoryId = row.original.id
      const { mutateAsync, isPending } = useDeleteCategoryMutation()


      return (
        <div className="flex gap-2">

          <EditCategoryDialog categoryId={categoryId}>
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={TaskEdit02Icon} />
            </Button>
          </EditCategoryDialog>



          {
            isPending ? (
              <Button size="sm" variant="outline" disabled>
                <HugeiconsIcon icon={Loader} className="animate-spin" />
              </Button>
            ) : (
              <Button size="sm" variant="destructive" onClick={async () => {
                await mutateAsync(categoryId)
                toast.success("Category deleted successfully")
              }} disabled={isPending}>
                <HugeiconsIcon icon={Delete02Icon} />
              </Button>
            )
          }
        </div >
      )
    },
  },
]