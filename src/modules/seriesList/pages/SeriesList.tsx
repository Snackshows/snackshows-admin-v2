import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { seriesTableColumns } from "../components/tables/seriesTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetSeriesQuery } from "../api/seriesManagement/seriesManagement.endpoint"

const SeriesListPage = () => {
  const { data } = useGetSeriesQuery()
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series List
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable columns={seriesTableColumns} data={data || []} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default SeriesListPage