import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { userTableColumns } from "../components/tables/usersTableColumn"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"

const UsersManagementPage = () => {
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Users Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable columns={userTableColumns} data={[]} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default UsersManagementPage