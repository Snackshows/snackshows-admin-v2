import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { TaskEdit02Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Episode } from "../../api/episodeManagement/episodeManagement.types"
import { Link, useNavigate } from "react-router"

const ActionCell = ({ episode }: { episode: Episode }) => {
  const navigate = useNavigate()
  return (
    <div className="flex gap-2 justify-center">
      <Link to={`/episodeList/${episode.id}`}>
        <Button variant="ghost" size="icon" >
          <HugeiconsIcon icon={TaskEdit02Icon} />
        </Button>
      </Link>
      {/* <Button variant="ghost" size="icon">
        <HugeiconsIcon icon={Delete01Icon} />
      </Button> */}
    </div>
  )
}

export const episodeTableColumns: ColumnDef<Episode>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
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
    accessorKey: "videoUrl",
    header: "Video",
    cell: ({ row }) => {
      const videoUrl = row.getValue("videoUrl") as string
      return (
        <Link
          to={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Video
        </Link>
      )
    },
  },
  {
    accessorKey: "series.name",
    header: "Movie Series",
    cell: ({ row }) => {
      const series = row.original.series
      return series?.name || "-"
    },
  },
  {
    accessorKey: "episodeNumber",
    header: "Episode Number",
  },
  {
    accessorKey: "duration",
    header: "Duration (seconds)",
  },
  {
    accessorKey: "isLocked",
    header: "Lock Status",
    cell: ({ row }) => {
      const isLocked = row.getValue("isLocked") as boolean
      return <Switch checked={isLocked} />
    },
  },
  {
    accessorKey: "releaseDate",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("releaseDate") as string
      return date ? new Date(date).toLocaleDateString() : "-"
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const episode = row.original
      return <ActionCell episode={episode} />
    },
  },
]
