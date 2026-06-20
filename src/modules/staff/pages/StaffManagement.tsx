
import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { employeeTableColumns } from "../components/tables/employeeTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetEmployeesQuery } from "../api/staffManagement/staffManagement.endpoint"
import { Button } from "@/components/ui/button"

import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AddNewStaffDialog } from "../components/Dialog/AddNewStaffDialog"

const StaffManagementPage = () => {
  const { data, isLoading } = useGetEmployeesQuery()

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Staff Management
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable loading={isLoading} columns={employeeTableColumns} data={data || []} actionButton={
            <AddNewStaffDialog>

              <Button>
                <HugeiconsIcon icon={Add01Icon} className="mr-2" />
                Add New Staff
              </Button>
            </AddNewStaffDialog>
          } />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default StaffManagementPage 