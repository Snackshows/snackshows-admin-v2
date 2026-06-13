import { Button } from "@/components/ui/button"
import { TaskEdit02Icon, Delete02Icon, Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Subscription } from "../../api/subscriptionManagement/subscriptionManagement.types"
import { Badge } from "@/components/ui/badge"
import { useDeleteSubscriptionMutation } from "../../api/subscriptionManagement/subscriptionManagement.endpoint"
import toast from "react-hot-toast"


export const subscriptionColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "serial",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "code",
    header: "Code",
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return `$${row.original.amount}`
    },
  },
  {
    accessorKey: "intervalPeriod",
    header: "Interval Period",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "isFree",
    header: "Free Plan",
    cell: ({ row }) => {
      return row.original.isFree ? "Yes" : "No"
    },
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.original.features
      return (
        <div className="flex flex-wrap gap-1">
          {features?.map((feature, index) => (
            <Badge key={feature.planFeatureId || index} variant="secondary" className="text-xs">
              {feature.label}
            </Badge>
          ))}
        </div>
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
      const subscriptionId = row.original.planId
      const { mutateAsync, isPending } = useDeleteSubscriptionMutation()

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <HugeiconsIcon icon={TaskEdit02Icon} />
          </Button>

          {
            isPending ? (
              <Button size="sm" variant="outline" disabled>
                <HugeiconsIcon icon={Loader} className="animate-spin" />
              </Button>
            ) : (
              <Button size="sm" variant="destructive" onClick={async () => {
                await mutateAsync(subscriptionId)
                toast.success("Subscription deleted successfully")
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
