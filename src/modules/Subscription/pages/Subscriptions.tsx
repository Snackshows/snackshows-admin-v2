import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { subscriptionColumns } from "../components/tables/subscriptionColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { useGetSubscriptionsQuery } from "../api/subscriptionManagement/subscriptionManagement.endpoint"
import { CreateSubscriptionDialog } from "../components/dialogs/CreateSubscriptionDialog"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"


const SubscriptionsPage = () => {
    const { data, isLoading, refetch } = useGetSubscriptionsQuery()

    useEffect(() => {
        refetch()
    }, [])
    return (
        <section className='w-full p-4'>
            <SectionCard className="w-full">
                <SectionHeader>
                    Subscription Management
                </SectionHeader>
                <SectionContent>
                    <ControllableDataTable
                        loading={isLoading}
                        columns={subscriptionColumns}
                        data={data || []} actionButton={<CreateSubscriptionDialog>
                            <Button>
                                <HugeiconsIcon icon={Add01Icon} />
                                Add Subscription
                            </Button>
                        </CreateSubscriptionDialog>} />
                </SectionContent>
            </SectionCard>
        </section>
    )
}

export default SubscriptionsPage