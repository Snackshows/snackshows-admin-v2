import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Edit01Icon, Delete01Icon, LoaderCircle } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Language } from "../../api/languagrList/languageList.types"
import { useDeleteLanguageMutation, useUpdateLanguageMutation } from "../../api/languagrList/languageList.endpoints"
import { LanguageEditDialog } from "../dialog/LanguageEditDialog"
import toast from "react-hot-toast"

export const languageTableColumns: ColumnDef<Language>[] = [
  {
    id: "no",
    header: "NO",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Language Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      const date = new Date(createdAt)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
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
    id: "action",
    header: "Action",
    cell: ({row}) => {
      
      
      const languageId = row.original.id; // Replace with actual language ID
      const { mutate: deleteLanguage ,isPending} = useDeleteLanguageMutation()

      const handleDelete = async () => {
        try {
          // Handle delete action
          await deleteLanguage(languageId)
          toast.success("Language deleted successfully")
        } catch (error) {
          toast.error("Failed to delete language")
          console.error("Error deleting language:", error)
        }
      }
      
      return (
        <div className="flex items-center gap-2 justify-center">
          <LanguageEditDialog languageId={languageId} >

          <Button variant="ghost" size="icon-sm">
            <HugeiconsIcon icon={Edit01Icon} />
          </Button>
          </LanguageEditDialog>
          {
            isPending ? (
              <Button variant="ghost" size="icon-sm" onClick={()=>handleDelete()}>
                <HugeiconsIcon icon={LoaderCircle} className="animate-spin" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon-sm" onClick={()=>handleDelete()}>
                <HugeiconsIcon icon={Delete01Icon} />
              </Button>
            )
          }
        </div>
      )
    },
  },
]
