import ContentHeader from "@/modules/Dashboard/components/ContentHeader";
import { AppSidebar } from "../../modules/Dashboard/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <ContentHeader />
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;
