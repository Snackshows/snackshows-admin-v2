import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { paymentColumns } from "../components/tables/paymentTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetPaymentsQuery } from "../api/paymentManagement/paymentManagement.endpoint"

const PaymentPage = () => {
    const { data, isLoading } = useGetPaymentsQuery()
    return (
        <section className='w-full p-4'>
            <SectionCard className="w-full">
                <SectionHeader>
                    Payment Management
                </SectionHeader>
                <SectionContent>
                    <ControllableDataTable columns={paymentColumns} data={data || []} loading={isLoading} />
                </SectionContent>
            </SectionCard>
        </section>
    )
}

export default PaymentPage
