import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { languageTableColumns } from "../components/tables/languageTableColumns"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { Button } from "@/components/ui/button"

import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { LanguageCreateDialog } from "../components/dialog/LanguageCreateDialog"


import { useGetAllLanguagesDataQuery } from "../api/languagrList/languageList.endpoints"

const LanguageList = () => {


  const { data: languagesData,isLoading } = useGetAllLanguagesDataQuery( )
   
  

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Web Series Language
        </SectionHeader>
        <SectionContent>
          <ControllableDataTable
            columns={languageTableColumns}
            data={languagesData?.data || []}
            loading={isLoading}
            actionButton={
              <LanguageCreateDialog>
                <Button>
                  <HugeiconsIcon icon={Add01Icon} />
                  New
                </Button>
              </LanguageCreateDialog>
            }
          />
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default LanguageList