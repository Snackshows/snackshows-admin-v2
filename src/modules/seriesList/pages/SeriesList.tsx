import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"

const SeriesListPage = () => {
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series List
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable columns={[]} data={[]} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default SeriesListPage