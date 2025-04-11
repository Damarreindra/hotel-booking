import HomeNavbar from "@/components/navbar/HomeNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex-1 transition-all  duration-300 ease-in-out bg-[#F4F7FE]`}
    >
      <HomeNavbar />
      <div className="p-4 mx-auto max-w-7xl md:p-6 h-screen relative">
        <main>{children}</main>
      </div>
    </div>
  );
}
