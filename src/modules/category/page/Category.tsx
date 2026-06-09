import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { categoryColumns } from "../components/tables/categoryColums"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetCategoriesQuery } from "../api/categoryManagement/categoryManagement.endpoint"
import { CreateCategoryDialog } from "../components/dialogs/CreateCategoryDialog"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"


const CategoryPage = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Category Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable
            loading={isLoading}
            columns={categoryColumns}
            data={data || []} actionButton={<CreateCategoryDialog>
              <Button>
                <HugeiconsIcon icon={Add01Icon} />
                Add Category
              </Button>
            </CreateCategoryDialog>} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default CategoryPage