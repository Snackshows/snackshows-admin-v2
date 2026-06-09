import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Add01Icon, Edit01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Series } from "../../api/seriesManagement/seriesManagement.types"
import { useNavigate } from "react-router"
import { Badge } from "@/components/ui/badge"

export const seriesTableColumns: ColumnDef<Series>[] = [
  {
    id: "no",
    header: "NO",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail as string
      return (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="h-12 w-12 rounded-md object-cover"
        />
      )
    },
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => {
      const banner = row.original.banner as string
      return (
        <img
          src={banner}
          alt="banner"
          className="aspect-video w-12 rounded-md object-cover"
        />
      )
    },
  },

  {
    accessorKey: "name",
    header: "Series Info",
    cell: ({ row }) => {
      const name = row.original.name
      const description = row.original.description
      return (
        <div className="w-full max-w-48  truncate text-left flex flex-col">
          <div className="text-md font-semibold">{name}</div>
          <div className="w-full ">{description}</div>
        </div>
      )
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categories = row.getValue("category") as { name: string }[]
      return <div>
        <Badge>{categories?.[0]?.name || "-"}</Badge>
      </div>
    },
  },
 
 
  {
    accessorKey: "totalEpisodes",
    header: "Total Episodes",
  },
  {
    accessorKey: "isAutoAnimateBanner",
    header: "Banner",
    cell: ({ row }) => {
      const isBanner = row.getValue("isAutoAnimateBanner") as boolean
      return <Switch checked={isBanner} />
    },
  },
  {
    accessorKey: "isTrending",
    header: "Trending",
    cell: ({ row }) => {
      const isTrending = row.getValue("isTrending") as boolean
      return <Switch checked={isTrending} />
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return <Switch checked={isActive} />
    },
  },
  {
    id: "addEpisode",
    header: "Add Episode",
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <HugeiconsIcon icon={Add01Icon} />
        </Button>
      )
    },
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const navigate = useNavigate()
      const series = row.original
      return (
        <Button variant="ghost" size="icon" onClick={() => navigate(`/series/${series.id}`)}>
          <HugeiconsIcon icon={Edit01Icon} />
        </Button>
      )
    },
  },
]
