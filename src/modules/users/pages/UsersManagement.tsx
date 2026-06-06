import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { userTableColumns } from "../components/tables/usersTableColumn"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetUsersQuery } from "../api/userManagement/userManagement.endpoint"

const UsersManagementPage = () => {
  const { data,isLoading } = useGetUsersQuery()
  console.log(data)
  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Users Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable loading={isLoading} columns={userTableColumns} data={data || []} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default UsersManagementPage