import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Add01Icon, Edit01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Series } from "../../api/seriesManagement/seriesManagement.types"
import { useNavigate } from "react-router"

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
      const thumbnail = row.getValue("thumbnail") as string
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categories = row.getValue("category") as { name: string }[]
      return categories?.[0]?.name || "-"
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[200px] truncate" title={description}>
          {description}
        </div>
      )
    },
  },
  {
    accessorKey: "releaseDate",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("releaseDate") as string
      return date ? new Date(date).toLocaleDateString() : "-"
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
