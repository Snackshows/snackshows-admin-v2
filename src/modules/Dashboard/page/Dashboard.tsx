import { AppSidebar } from '@/modules/Dashboard/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import ContentHeader from '../components/ContentHeader'

const DashboardPage = () => {
  return (

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>

  )
}

export default DashboardPage