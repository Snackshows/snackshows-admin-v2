import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { episodeTableColumns } from "../components/tables/episodeTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetEpisodesQuery } from "../api/episodeManagement/episodeManagement.endpoint"

const EpisodeListPage = () => {
  const { data } = useGetEpisodesQuery()
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Episode List
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable columns={episodeTableColumns} data={data || []} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default EpisodeListPage