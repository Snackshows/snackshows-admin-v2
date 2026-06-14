import { Button } from "@/components/ui/button"

import { TaskEdit02Icon, CircleLock02Icon, CircleUnlock02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Episode } from "../../api/episodeManagement/episodeManagement.types"
import { Link } from "react-router"

const ActionCell = ({ episode }: { episode: Episode }) => {
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
      return (<section className="w-full flex items-center justify-center">


        <img
          src={thumbnail}
          alt="thumbnail"
          className="h-24 w-12 rounded-md object-cover border border-gray-200"
        />
      </section>
      )
    },
  },
  {
    accessorKey: "videoUrl",
    header: "Video",
    cell: ({ row }) => {
      const videoUrl = row.getValue("videoUrl") as string
      const thumbnail = row.getValue("thumbnail") as string
      return (<section className="w-full flex items-center justify-center">


        <Link
          to={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={thumbnail}
            alt="thumbnail"
            className="h-24 w-12 rounded-md object-cover border border-gray-200"
          />

        </Link>
      </section>
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
    cell: ({ row }) => {
      const episodeNumber = row.getValue("episodeNumber") as number
      return episodeNumber || "-"
    },
  },
  {
    accessorKey: "duration",
    header: "Duration (seconds)",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number
      return duration || "-"
    },
  },
  {
    accessorKey: "isLocked",
    header: "Lock Status",
    cell: ({ row }) => {
      const isLocked = row.getValue("isLocked") as boolean
      return <section className="w-full flex items-center justify-center">
        {isLocked ? (
          <HugeiconsIcon icon={CircleLock02Icon} className="text-red-500" />
        ) : (
          <HugeiconsIcon icon={CircleUnlock02Icon} className="text-green-500" />
        )}
      </section>
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
      return (
        <section className="w-full flex items-center justify-center">
          <ActionCell episode={episode} />
        </section>
      )
    },
  },
]
