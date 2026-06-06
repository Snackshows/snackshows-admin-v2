import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { seriesTableColumns } from "../components/tables/seriesTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetSeriesQuery } from "../api/seriesManagement/seriesManagement.endpoint"
import { Button } from "@/components/ui/button"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const SeriesListPage = () => {
  const { data, isLoading } = useGetSeriesQuery()
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series List
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable
            loading={isLoading}
            columns={seriesTableColumns}
            data={data || []}
            actionButton={
              <Button>
                <HugeiconsIcon icon={Add01Icon} />
                Add Series
              </Button>
            }
          />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default SeriesListPage