


import { UserAccountIcon, TaskEdit02Icon, UserRemove01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { EmployeeData } from "../../api/staffManagement/staffManagement.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EditStaffDialog } from "../Dialog/EditStaffDialog"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDeleteEmployeeMutation } from "../../api/staffManagement/staffManagement.endpoint"
import toast from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

export const employeeTableColumns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row, table }) => {
      return table.getSortedRowModel().flatRows.indexOf(row) + 1
    },
  },
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ row }) => {
      const image = row.getValue("image") as string | null
      return (
        <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition-all">
          <AvatarImage src={image || undefined} alt="Profile" />
          <AvatarFallback>
            <HugeiconsIcon icon={UserAccountIcon} />
          </AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string

      return (
        <span className="text-left">
          {name}
        </span>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as number
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${role === 1 ? "bg-purple-100 text-purple-700" :
          role === 2 ? "bg-blue-100 text-blue-700" :
            "bg-gray-100 text-gray-700"
          }`}>
          {role === 1 ? "Admin" : role === 2 ? "Staff" : "User"}
        </span>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      return row.getValue("phone") || "-"
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked

      if (isBlocked) {
        return (
          <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Blocked
          </Badge>
        )
      }else{
        return (
          <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Active
          </Badge>
        )
      }
    },
  },
      
  {
    accessorKey: "joiningDate",
    header: "Joined On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joiningDate"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const staffId = row.original.id
      const staffName = row.original.name
      const { mutateAsync: deleteEmployee } = useDeleteEmployeeMutation()
      const handleDelete = async () => {
        try {

          await deleteEmployee(staffId)
          toast.success("Employee deleted successfully")
        } catch (error) {
          toast.error("Failed to delete employee")
        }
        
      }

      return (
        <div className="flex gap-2 items-center justify-center">
          <EditStaffDialog staffName={staffName} staffId={staffId}>
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={TaskEdit02Icon} />
            </Button>
          </EditStaffDialog>
          <Dialog>
            <DialogTrigger>
              <Button size="sm"  variant="destructive">
                <HugeiconsIcon icon={UserRemove01Icon} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose>
                  <Button onClick={() => handleDelete()} variant="destructive">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      )
    },
  },
]