import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import Navbar from "@/components/navbar/LandingNavbar";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className={`flex-1 transition-all  duration-300 ease-in-out`}>
        <DashboardNavbar />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <main>{children}</main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
}
