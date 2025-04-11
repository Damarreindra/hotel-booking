"use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BannerCard from "@/components/carouselCard/BannerCard";
import LogoHundred from "@/public/images/banner/banner_img_hundred.png";
import LogoThumb from "@/public/images/banner/banner_img_thumb.png";
import LogoThumbPlus from "@/public/images/banner/banner_img_thumb_plus.png";
import Autoplay from "embla-carousel-autoplay";
function BannerCarousel() {
  return (
    <section className="w-full -ml-4 border-b border-gray-300">
      <Carousel
        className="w-full -mb-10"
        plugins={[
          Autoplay({
            delay: 3500,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <BannerCard
              type="plus"
              imageSrc={LogoHundred}
              headerText="100% Refund & Reschedule"
              text="100% money-back guarantee for your booking."
            />
          </CarouselItem>
          <CarouselItem>
            <BannerCard
              type="preferred"
              imageSrc={LogoThumb}
              headerText="Preffered Partner"
              text="A top-rated accommodation, highly sought after, with excellent reviews."
            />
          </CarouselItem>
          <CarouselItem>
            <BannerCard
              type="preferred"
              imageSrc={LogoThumbPlus}
              headerText="Preffered Partner Plus"
              text="A selected accommodation with positive customer reviews."
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default BannerCarousel;
