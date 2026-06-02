import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { categoryColumns } from "../components/tables/categoryColums"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"

const CategoryPage = () => {
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Category Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable columns={categoryColumns} data={[]} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default CategoryPage