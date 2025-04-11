import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import { Toaster } from "@/components/ui/sonner";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import RoomSearchForm from "@/components/form/RoomSearchForm";
import HomeSearchContainer from "@/components/HomeSearchContainer";
import FilterContainer from "@/components/FilterContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`transition-all  duration-300 ease-in-out bg-white h-full`}>
      <HomeNavbar />
      <HomeSearchContainer />

      <div className="p-4 mx-auto max-w-7xl md:p-6  h-fit">
        <main>{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
