import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { SectionCard, SectionContent } from "@/components/ui/section-card"
import { useGetAllCurrencies } from "../api/currency/currency.endpoints"
import { currencyTableColumns } from "../components/tables/CurrencyColumns";
import { Button } from "@/components/ui/button";

const CurrencyPage = () => {


    const { data: currencies, isLoading } = useGetAllCurrencies();
  return (
    <section className='w-full'>
      <SectionCard className="w-full">
        
        <SectionContent>
          <ControllableDataTable data={currencies?.data || []} columns={currencyTableColumns} loading={isLoading} actionButton={<Button>Add Currency</Button>} />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default CurrencyPage