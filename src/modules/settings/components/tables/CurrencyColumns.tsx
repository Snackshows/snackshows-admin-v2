
import type { ColumnDef } from "@tanstack/react-table"
import type { CurrencyData } from "../../api/currency/currency.types"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export const currencyTableColumns: ColumnDef<CurrencyData>[] = [
  {
    id: "no",
    header: "NO",
    cell: ({ row }) => {
        return `#${row.index + 1}`
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "currencyCode",
    header: "Code",
  },
  
  {
    accessorKey: "countryCode",
    header: "Country",
  },
  
  {
    accessorKey: "isActive",
    header: "Default",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <Switch
          checked={isActive}
          onCheckedChange={() => {
            // Handle toggle change
          }}
        />
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      return (
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      )
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
        const currencyId = row.original.id
        console.log(currencyId)
      return (
        <section>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </section>
      )
    },
  },
 
]