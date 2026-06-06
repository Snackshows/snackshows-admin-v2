


import {  UserAccountIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { UserData } from "../../api/userManagement/userManagement.types"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const userTableColumns: ColumnDef<UserData>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row, table }) => {
      return table.getSortedRowModel().flatRows.indexOf(row) + 1
    },
  },
  {
    accessorKey: "avatar",
    header: "Profile",
    cell: ({ row }) => {
      const avatar = row.getValue("avatar") as string
      const userId = row.getValue("id") as string

      return (
        <Link
          to={`/users/${userId}`}
          
        >
          <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition-all">
            <AvatarImage src={avatar} alt="Profile" />
            <AvatarFallback>
              <HugeiconsIcon icon={UserAccountIcon} />
            </AvatarFallback>
          </Avatar>
         
        </Link>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
    
      const userId = row.getValue("id") as string
      const name = row.getValue("name") as string

      return (
        <Link
          to={`/users/${userId}`}
          className="text-left hover:text-blue-600 hover:underline transition-colors"
        >
          {name}
        </Link>
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
      const role = row.getValue("role") as string | null
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${role === "admin" ? "bg-purple-100 text-purple-700" :
            role === "moderator" ? "bg-blue-100 text-blue-700" :
              role ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-500"
          }`}>
          {role || "User"}
        </span>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return row.getValue("phoneNumber") || "-"
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const isBlocked = row.getValue("isBlocked")
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {isBlocked ? "Blocked" : "Active"}
        </span>
      )
    },
  },
  {
    accessorKey: "joinedOn",
    header: "Joined On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedOn"))
      return date.toLocaleDateString()
    },
  },
  // {
  //   accessorKey: "id",
  //   header: "Action",
  //   cell: () => {
  //     return (
  //       <div className="flex gap-2">
  //         <Button size="sm" variant="outline">
  //           <HugeiconsIcon icon={TaskEdit02Icon} />
  //         </Button>
  //         <Button size="sm" variant="destructive">
  //           Delete
  //         </Button>
  //       </div>
  //     )
  //   },
  // },
]