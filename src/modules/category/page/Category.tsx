import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { categoryColumns } from "../components/tables/categoryColums"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetCategoriesQuery } from "../api/categoryManagement/categoryManagement.endpoint"


const CategoryPage = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Category Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable loading={isLoading} columns={categoryColumns} data={data || []} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default CategoryPage