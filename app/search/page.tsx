import AvailableRoomType from "@/components/AvailableRoomType";
import BannerCarousel from "@/components/carousel/BannerCarousel";
import WhyHereCarousel from "@/components/carousel/WhyHereCarousel";

function Page() {
  return (
    <section className="flex-1 h-fit flex flex-col items-center">
      <BannerCarousel />
      <WhyHereCarousel />
      <AvailableRoomType />
    </section>
  );
}

export default Page;
